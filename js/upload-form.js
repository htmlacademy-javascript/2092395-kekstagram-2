import { openModal, setupModalClose } from './modal-control.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { showAlert } from './util.js';
import { sendData } from './api.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i; // Проверяет весь хэштег целиком
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form'); // Получили форму загрузки изображения
const uploadFileInput = document.querySelector('#upload-file'); // Получили элемент загрузки фотографии
const overlay = document.querySelector('.img-upload__overlay'); // Получили overlay
const hashtagInput = document.querySelector('.text__hashtags'); // Получили поле ввода хэштегов
const commentInput = document.querySelector('.text__description'); // Получили поле ввода комментариев
const submitButton = document.querySelector('.img-upload__submit');

// В библиотеку передаем форму, вторым параметром описываем настройки ошибок
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Создаем объект с сообщениями об ошибках
const hashtagErrors = {
  count: `Не более ${MAX_HASHTAG_COUNT} хэштегов`,
  unique: 'Хэштеги не должны повторяться',
  invalid: 'Введен невалидный хэштег',
};

const currentErrors = []; // Создаем пустой массив для добавления ошибок

// Получили кнопку закрытия формы
const cancelButton = document.querySelector('#upload-cancel');

const resetForm = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadFileInput.value = '';
};

// Функция открывает форму после загрузки фотографии
const showModal = () => {
  openModal(overlay, resetForm);
};

// Функция закрывает модальное окно по клику на overlay или кнопку закрыть.
setupModalClose(overlay, cancelButton);

// Функция проверяет, является ли строка с тегами (value) валидной
const validateTags = (value) => {
  currentErrors.length = []; // Обнуляем мвссив после каждой проверки
  // Подготавливаем теги для проверки
  const tags = value
    .toLowerCase()// Переводит символы в нижний регистр
    .trim() // убирает пробелы в начале и конце строки
    .split(' ') // разбивает строку по пробелам (возвращает массив)
    .filter((tag) => tag.trim().length); // убирает пустые строки (если были лишние пробелы)

  let isValid = true;

  // Проверка количества
  if (tags.length > MAX_HASHTAG_COUNT) {
    currentErrors.push(hashtagErrors.count);
    isValid = false;
  }

  // Проверка уникальности
  if (tags.length !== new Set(tags).size) {
    currentErrors.push(hashtagErrors.unique);
    isValid = false;
  }

  // Проверка каждого хэштега
  const isValidTags = tags.every((tag) => VALID_SYMBOLS.test(tag));
  if (!isValidTags) {
    currentErrors.push(hashtagErrors.invalid);
    isValid = false;
  }

  return isValid;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const getErrorMessages = () => currentErrors.join(' и ');

// Добавляем валидатор хэштегов с кастомными сообщениями
pristine.addValidator(
  hashtagInput,
  validateTags,
  getErrorMessages
);

// Добавляем валидатор для комментария
pristine.addValidator(
  commentInput,
  validateComment,
  `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`
);

// Вешаем обработчик события на форму для отслеживания ввода хэштега или комментария
uploadForm.addEventListener('input', (evt) => {
  pristine.validate(evt.target);
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setOnFormSubmit = (onSuccess) => {

  // Обработчик отправки формы при валидных данных
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => showAlert('Не удалось отправить форму. Попробуйте еще раз'),
        new FormData(evt.target),
      );
    }
  });
};

// Открытие модального окна
uploadFileInput.addEventListener('change', () => {
  showModal();
});

export { setOnFormSubmit };
