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
const addformTitleElement = addformElement.querySelector('#title');
//const submitButton = addformElement.querySelector('.ad-form__submit');
const addformPriceElement = addformElement.querySelector('#price');
const housingTypeInputElement = addformElement.querySelector('#type');
const roomNumberformElement = addformElement.querySelector('#room_number');
const capacityformElement = addformElement.querySelector('#capacity');
const timeInformElement = addformElement.querySelector('#timein');
const timeOutformElement = addformElement.querySelector('#timeout');

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
  classTo: 'pristine_value',
  errorClass: 'pristine_value--invalid',
  successClass: 'pristine_value--valid',
  errorTextParent: 'pristine_value',
  errorTextClass: 'text-pristine',
  errorTextTag: 'div'
});
//функция по проверке длины заголовка заголовка
const controlTitleLenght = (str)=> str.length >= 30 && str.length <= 100;
// функция по проверке цены на жильёж
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

pristine.addValidator(addformPriceElement, controlPriceValue, getPriceErrorMessage);
pristine.addValidator(addformTitleElement,controlTitleLenght,'введите длину заголовка от 30 до 100 символов');
pristine.addValidator(capacityformElement,controlCapacity,getCapacityErrorMessage);
pristine.addValidator(roomNumberformElement,controlCapacity,getCapacityErrorMessage);
//меняем тип жилья и отражаем минимальную стоимость
const onChangehousingType = ()=>{

  addformPriceElement.min = BOOKING_MIN_PRICE[housingTypeInputElement.value];
  addformPriceElement.placeholder = addformPriceElement.min;
};
//событие при нажитии кнопки
const onAddFormSubmit = (evt)=>{
  evt.preventDefault();
  pristine.validate();
};

//функция по инициализации формы
const validateForm = ()=>{
  addformElement.addEventListener('submit',onAddFormSubmit);
  housingTypeInputElement.addEventListener('change',onChangehousingType);
  timeInformElement.addEventListener('change',onChangeTimeOut);
  timeOutformElement.addEventListener('change',onChangeTimeIn);
};
export{toDisactiveForms,toActiveForms,validateForm};
