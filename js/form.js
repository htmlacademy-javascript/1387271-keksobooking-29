const addformElement = document.querySelector('.ad-form');
const mapfiltersElement = document.querySelector('.map__filters');
//функция по инициализации неактивного состояния формы
const disactiveForm = (form)=>{
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const toDisactiveForms = ()=>{
  disactiveForm(addformElement);
  disactiveForm(mapfiltersElement);
};
export{toDisactiveForms};
