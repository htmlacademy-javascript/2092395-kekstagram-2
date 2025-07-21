import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
// Ф-я открывает модальное окно, котороее передано как параметр
const openModal = (modalElement) => {
  // удаляем класс hidden у переданного элемента
  modalElement.classList.remove('hidden');
  // тегу body задаем класс modal-open
  body.classList.add('modal-open');
  // добавляем обработчик отслеживания нажатия клавиши Esc
  document.addEventListener('keydown', onEscKeyDown);
};
// Ф-я закрывает модальное окно, котороее передано как параметр
const closeModal = (modalElemen) => {
  modalElemen.classList.add('hidden');
  body.classList.remove('modal-open');
  // удаляем обработчик отслеживания нажатия клавиши Esc
  document.removeEventListener('keydown', onEscKeyDown);
};

// Ф-я закрывает модальное окно при нажатии Esc
function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) { // Проверяем, нажатая кнопка это Esc
    evt.preventDefault();
    // Ищем любое открытое модальное окно (без класса hidden)
    const activeModal = document.querySelector('.big-picture:not(.hidden), .img-upload__overlay:not(.hidden)');
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

// Общая функция для закрытия по клику на overlay или крестик
// closeParam - колбэк с особенностью закрытия модального окна (form.reset() или clearComments)
const setupModalClose = (modalElement, closeButton) => {
  modalElement.addEventListener('click', (evt) => {
    const target = evt.target;
    // Проверяем, что клик был по overlay или крестику
    if (target === modalElement || target === closeButton) {
      closeModal(modalElement); // Закрываем модалку
    }
  });
};

export { openModal, closeModal, setupModalClose };
