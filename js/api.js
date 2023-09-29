import{toDisactiveForms} from './form.js';
import{showMessage} from './util.js';
const PATH_URL_GET = 'https://29.javascript.pages.academy/keksobooking/dat';
const PATH_URL_POST = 'https://29.javascript.pages.academy/keksobooking/';
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
const sendData = (onSuccess, onError, body) => {
  fetch(PATH_URL_POST,
    {
      method: 'POST',
      body,
    }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch((error) => onError(error));
};
export {getData,sendData};

