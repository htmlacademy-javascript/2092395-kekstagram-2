import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
// Переменная для хранения текущего модального окна
// Присваиваем значение чтобы показать что изначально нет открытого окна
let currentModal = null;
// Переменная для хранения функции, которая будет выполняться при закрытии модальногго окна
let onCloseCallback = null;

// Ф-я ткрытия модального окна
const openModal = (modalElement, callback) => {
  // Запоминаем какое окно открыто
  currentModal = modalElement;
  // Запоминаем какую ф-ю нужно выполнить при закрытии окна
  onCloseCallback = callback;
  // Показываем окно
  modalElement.classList.remove('hidden');
  // Блокируем прокрутку страницы
  body.classList.add('modal-open');
  // Вешаем обработчик события нажатия копки Escape
  document.addEventListener('keydown', onEscKeyDown);
};

// Ф-я закрытия модальногоо окна
const closeModal = () => {
  // Проверяем есть ли модальное окно
  if (!currentModal) {
    return;
  }
  // Скрываем окно
  currentModal.classList.add('hidden');
  // Разблокируем прокрутку сстраницы
  body.classList.remove('modal-open');
  // удаляем обработчик отслеживания нажатия клавиши Esc
  document.removeEventListener('keydown', onEscKeyDown);
  // Выполняет функцию, переданную при открытии
  if (onCloseCallback) {
    onCloseCallback();
  }
  // Очищаем память
  currentModal = null;
  onCloseCallback = null;
};

// Ф-я обработчик клавиши EScape
function onEscKeyDown(evt) {
  // Проверяет нажатие клавиши Esc и что модальное окно открыто
  if (!isEscapeKey(evt) || !currentModal) {
    return;
  }

  // Проверяем, есть ли активные сообщения (error/success)
  const activeMessage = document.querySelector('.error, .success');
  if (activeMessage) {
    return; // Если есть сообщение - не закрываем форму
  }

  // Проверяет где сейчас фокус
  const activeElement = document.activeElement;
  // Проверяет наодится ли текстовое порле в фокусе
  const isTextInput = activeElement.matches('input[type="text"], textarea');

  // Если фокус в текстовом поле - не закрывает окно
  if (isTextInput && currentModal.contains(activeElement)) {
    return;
  }

  evt.preventDefault();
  // Закрывает окно если проверки пройдены
  closeModal();
}
// Настройка закрытия по клику
const setupModalClose = (modalElement, closeButton) => {
  modalElement.addEventListener('click', (evt) => {
    if (evt.target === modalElement || evt.target === closeButton) {
      closeModal();
    }
  });
};

export { openModal, closeModal, setupModalClose };
