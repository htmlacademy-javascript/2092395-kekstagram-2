import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
let currentModal;
// Ф-я открывает модальное окно, котороее передано как параметр
const openModal = (modalElement) => {
  // удаляем класс hidden у переданного элемента
  currentModal = modalElement;
  modalElement.classList.remove('hidden');
  // тегу body задаем класс modal-open
  body.classList.add('modal-open');
  // добавляем обработчик отслеживания нажатия клавиши Esc
  document.addEventListener('keydown', onEscKeyDown);
};
// Ф-я закрывает модальное окно, котороее передано как параметр
const closeModal = (modalElement) => {
  // Сбрасываем все текстовые поля внутри модального окна
  const textInputs = modalElement.querySelectorAll('input[type="text"], textarea');
  textInputs.forEach((input) => {
    input.value = '';
  });

  modalElement.classList.add('hidden');
  body.classList.remove('modal-open');
  // удаляем обработчик отслеживания нажатия клавиши Esc
  document.removeEventListener('keydown', onEscKeyDown);
};

// Универсальный обработчик Esc
function onEscKeyDown(evt) {
  if (!isEscapeKey(evt) || !currentModal) {
    return;
  }

  const activeElement = document.activeElement;

  // Проверяем, является ли активный элемент текстовым полем
  const isTextInput = activeElement.matches('input[type="text"], textarea');

  // Если фокус в текстовом поле внутри текущего модального окна - не закрываем
  if (isTextInput && currentModal.contains(activeElement)) {
    return;
  }

  evt.preventDefault();
  closeModal(currentModal);
}

// Общая функция для закрытия по клику на overlay или крестик
// onCloseCallback - колбэк с особенностью закрытия модального окна (form.reset() или clearComments)
const setupModalClose = (modalElement, closeButton, onCloseCallback) => {

  modalElement.addEventListener('click', (evt) => {
    const target = evt.target;
    // Проверяем, что клик был по overlay или крестику
    if (target === modalElement || target === closeButton) {
      onCloseCallback();
      closeModal(modalElement); // Закрываем модалку
    }
  });

};

export { openModal, closeModal, setupModalClose };
