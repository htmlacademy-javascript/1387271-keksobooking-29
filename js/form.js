const BOOKING_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};
const addformElement = document.querySelector('.ad-form');
const mapfiltersElement = document.querySelector('.map__filters');
const addformTitleElement = addformElement.querySelector('#title');
const submitButton = addformElement.querySelector('.ad-form__submit');
const addformPriceElement = addformElement.querySelector('#price');
const housingTypeInputElement = addformElement.querySelector('#type');

//функция по инициализации неактивного состояния формы
const disactiveForm = (form)=>{
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};
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
  classTo: 'pristine-custom',
  errorClass: 'pristine-custom--invalid',
  successClass: 'pristine-custom--valid',
  errorTextParent: 'pristine-custom',
  errorTextClass: 'text-pristine',
  errorTextTag: 'div'
});
//функция по проверке длины заголовка заголовка
const controlTitleLenght = (str)=> str.length >= 30 && str.length <= 100;

// функция по проверке цены на жильёж
const controlPriceValue = ()=>addformPriceElement.value >= BOOKING_MIN_PRICE[housingTypeInputElement.value]
const getPriceErrorMessage = () => {
  if (addformPriceElement.value <= BOOKING_MIN_PRICE[housingTypeInputElement.value]) {
    return `минимальная цена ${BOOKING_MIN_PRICE[housingTypeInputElement.value]}`;
  }
};

const onAddFormSubmit = ()=>{
  // evt.preventDefault();
  pristine.validate();
  pristine.addValidator(addformTitleElement,controlTitleLenght,'введите длину заголовка от 30 до 100 символов');
  pristine.addValidator(addformPriceElement, controlPriceValue, getPriceErrorMessage);
};


const validateForm = ()=>addformElement.addEventListener('submit',onAddFormSubmit);

export{toDisactiveForms,toActiveForms,validateForm};
