import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const body = document.querySelector('body');

const MessageType = {
  SUCCESS: 'success',
  ERROR: 'error',
  DATA_ERROR: 'data-error'
};

const templates = {
  [MessageType.SUCCESS]: document.querySelector('#success').content.querySelector('.success'),
  [MessageType.ERROR]: document.querySelector('#error').content.querySelector('.error'),
  [MessageType.DATA_ERROR]: document.querySelector('#data-error').content.querySelector('.data-error')
};

const showMessage = (type, text = '') => {

  const oldMessage = document.querySelector(`.${type}`);
  if (oldMessage) {
    oldMessage.remove();
  }

  const template = templates[type];
  if (!template) {
    return;
  }

  const messageElement = template.cloneNode(true);
  if (text) {
    const titleElement = messageElement.querySelector('.error__title') ||
                        messageElement.querySelector('.data-error__title');
    if (titleElement) {
      titleElement.textContent = text;
    }
  }

  const hideMessage = () => {
    messageElement.remove();
    body.removeEventListener('keydown', onEscDown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onEscDown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      hideMessage();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target.closest(`.${type}__inner`)) {
      return;
    }
    hideMessage();
  }

  const closeButton = messageElement.querySelector(`.${type}__button`);
  if (closeButton) {
    closeButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      hideMessage();
    });
  }

  body.append(messageElement);
  body.addEventListener('keydown', onEscDown);
  document.addEventListener('click', onDocumentClick);

  return hideMessage;
};

const showSuccessMessage = () => showMessage(MessageType.SUCCESS);
const showErrorMessage = () => showMessage(MessageType.ERROR);

const showDataErrorMessage = (text) => {
  const hideMessage = showMessage(MessageType.DATA_ERROR, text);
  const timerId = setTimeout(hideMessage, ALERT_SHOW_TIME);

  return () => {
    clearTimeout(timerId);
    hideMessage();
  };
};

export { showSuccessMessage, showErrorMessage, showDataErrorMessage };
