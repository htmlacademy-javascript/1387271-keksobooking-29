import { sendData } from './api.js';
import { onSuccessMessageExitClick,onSuccessMessageExitEsc,onErrorMessageExitClick,onErrorMessageExitEsc} from './util.js';
import { resetData } from './map.js';
const BOOKING_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};
const CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const addformElement = document.querySelector('.ad-form');
const mapfiltersElement = document.querySelector('.map__filters');
const submitFormButton = addformElement.querySelector('.ad-form__submit');
const addformPriceElement = addformElement.querySelector('#price');
const housingTypeInputElement = addformElement.querySelector('#type');
const roomNumberformElement = addformElement.querySelector('#room_number');
const capacityformElement = addformElement.querySelector('#capacity');
const timeInformElement = addformElement.querySelector('#timein');
const timeOutformElement = addformElement.querySelector('#timeout');
const sliderPriceElement = addformElement.querySelector('.ad-form__slider');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

//функция по инициализации неактивного состояния формы
const disactiveForm = (form)=>{
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};
//функция по инициализации активного состояния формы
const activeForm = (form)=>{
  form.classList.remove(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};


const toDisactiveForms = ()=>{
  disactiveForm(addformElement);
  disactiveForm(mapfiltersElement);
};
const toActiveForms = ()=>{
  activeForm(addformElement);
  activeForm(mapfiltersElement);
};

//валидация полей  формы
//создание объекта библиотеки pristine
const pristine = new Pristine(addformElement,{
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
  errorTextTag: 'div'
});

const controlPriceValue = ()=>addformPriceElement.value >= BOOKING_MIN_PRICE[housingTypeInputElement.value];
const getPriceErrorMessage = () => {
  if (addformPriceElement.value <= BOOKING_MIN_PRICE[housingTypeInputElement.value]) {
    return `минимальная цена ${BOOKING_MIN_PRICE[housingTypeInputElement.value]}`;
  }
};
//функция по проверке вместимости жилья
const controlCapacity = ()=>CAPACITY[roomNumberformElement.value].includes(capacityformElement.value);
const getCapacityErrorMessage = ()=>`Размещение в ${roomNumberformElement.value} ${roomNumberformElement.value === '1' ? 'комнате' : 'комнатах'} для ${capacityformElement.value} ${capacityformElement.value === '1' ? 'гостя' : 'гостей'} невозможно`;

//функции по выбору опции одного поля автоматически изменят значение другого(Даты заезда и даты выезда)
const onChangeTimeIn = () =>{
  timeInformElement.value = timeOutformElement.value;
};
const onChangeTimeOut = ()=>{
  timeOutformElement.value = timeInformElement.value;
};

//инициализация слайдера
const initSlider = ()=>{
  noUiSlider.create(sliderPriceElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: BOOKING_MIN_PRICE[housingTypeInputElement.value],
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderPriceElement.noUiSlider.on('update',() =>{
    addformPriceElement.value = sliderPriceElement.noUiSlider.get();
  });
  housingTypeInputElement.addEventListener('change',()=>{
    addformPriceElement.value = BOOKING_MIN_PRICE[housingTypeInputElement.value];
  });
  addformPriceElement.addEventListener('input', ()=> {
    sliderPriceElement.noUiSlider.set(addformPriceElement.value);
  });

};
pristine.addValidator(addformPriceElement, controlPriceValue, getPriceErrorMessage);
pristine.addValidator(capacityformElement,controlCapacity,getCapacityErrorMessage);
pristine.addValidator(roomNumberformElement,controlCapacity,getCapacityErrorMessage);
//валидатор для количества жильцов и комнат
const onValidateCapacityRooms = ()=>{
  pristine.validate(capacityformElement);
  pristine.validate(roomNumberformElement);
};
//меняем тип жилья и отражаем минимальную стоимость
const onChangehousingType = ()=>{
  addformPriceElement.min = BOOKING_MIN_PRICE[housingTypeInputElement.value];
  addformPriceElement.placeholder = BOOKING_MIN_PRICE[housingTypeInputElement.value];
  sliderPriceElement.noUiSlider.set(BOOKING_MIN_PRICE[housingTypeInputElement.value]);

};
const blockSubmitButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = 'Отправляю данные...';
};
const unblockSubmitButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = 'Опубликовать';
};

function showSuccessMessage(){
  const successBlock = successTemplate.cloneNode(true);
  document.body.append(successBlock);
  document.addEventListener('keydown', onSuccessMessageExitEsc);
  document.addEventListener('click', onSuccessMessageExitClick);
}
function showErrorMessage(){
  const errorBlock = errorTemplate.cloneNode(true);
  document.body.append(errorBlock);
  document.addEventListener('keydown', onErrorMessageExitEsc);
  document.addEventListener('click', onErrorMessageExitClick);
  document.querySelector('.error__button').addEventListener('click', onErrorMessageExitClick);
}
const onSendSuccess = ()=>{
  showSuccessMessage();
  unblockSubmitButton();
  resetData();
};
const onSendError = ()=>{
  showErrorMessage();
  unblockSubmitButton();
};
//событие при нажитии кнопки
const onAddFormSubmit = (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    blockSubmitButton();
    sendData(onSendSuccess,onSendError,new FormData(evt.target));
  } else {
    unblockSubmitButton();
  }
};

//функция по инициализации формы
const validateForm = ()=>{
  initSlider();
  addformElement.addEventListener('submit',onAddFormSubmit);
  housingTypeInputElement.addEventListener('change',onChangehousingType);
  timeInformElement.addEventListener('change',onChangeTimeOut);
  timeOutformElement.addEventListener('change',onChangeTimeIn);
  capacityformElement.addEventListener('change',onValidateCapacityRooms);
  roomNumberformElement.addEventListener('change',onValidateCapacityRooms);
};
const resetForm = ()=>{
  mapfiltersElement.reset();
  addformElement.reset();
  pristine.reset();
  sliderPriceElement.noUiSlider.set(BOOKING_MIN_PRICE[housingTypeInputElement.value]);
};
export {toDisactiveForms,toActiveForms,validateForm,addformElement,mapfiltersElement,resetForm,errorTemplate};
