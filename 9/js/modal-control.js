import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const commentInputBigPicture = document.querySelector('.social__footer-text');


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
    const activeElement = document.activeElement;
    // Проверяем какое модальное окно активно
    const bigPictureModal = document.querySelector('.big-picture:not(.hidden)');
    const uploadForm = document.querySelector('.img-upload__overlay:not(.hidden)');
    // Для формы: не закрывать если фокус в поле комментария
    if (uploadForm) {
      // Находим активные инпуты
      const isInputFocused = activeElement === hashtagInput || activeElement === commentInput;

      if (isInputFocused) {
        return;
      }
    }

    // Для просмотра фото: не закрывать если фокус в поле комментария
    if (bigPictureModal) {
      const isCommentFocused = activeElement === commentInputBigPicture;
      if (isCommentFocused) {
        return;
      }
    }

    evt.preventDefault();
    const activeModal = bigPictureModal || uploadForm;
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

// Общая функция для закрытия по клику на overlay или крестик
// closeParam - колбэк с особенностью закрытия модального окна (form.reset() или clearComments)
const setupModalClose = (modalElement, closeButton, closeParam) => {
  modalElement.addEventListener('click', (evt) => {
    const target = evt.target;
    // Проверяем, что клик был по overlay или крестику
    if (target === modalElement || target === closeButton) {
      closeModal(modalElement); // Закрываем модалку
      closeParam();
    }
  });
};

export { openModal, closeModal, setupModalClose };
