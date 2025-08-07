import { showDataErrorMessage, showErrorMessage, } from './messages.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Получаем миниатюры с сервера
const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
  // Получаем объект ответа и извлекам данные
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные!!!');
      }
      return response.json();
    })

  // Получаем данные и выводим в консоль
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showDataErrorMessage('Не удалось загрузить данные с сервера');
      if (onFail) {
        onFail();
      }
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Данные не валидны');
      }
    })
    .catch(() => {
      showErrorMessage();
      if (onFail) {
        onFail();
      }
    });
};

export { getData, sendData };
