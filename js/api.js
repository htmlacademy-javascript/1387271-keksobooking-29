import{toDisactiveForms} from './form.js';
import{showMessage} from './util.js';
const PATH_URL_GET = 'https://29.javascript.pages.academy/keksobooking/data';
const getData = (onSuccess) => {
  fetch(PATH_URL_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка получения данных, обновите страницу');
    })
    .then((serverData) => onSuccess(serverData))
    .catch((err) => {
      showMessage(err);
      toDisactiveForms();
    });
};
export {getData};
