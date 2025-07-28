import { openModal, closeModal, setupModalClose } from './modal-control.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i; // Проверяет весь хэштег целиком
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form'); // Получили форму загрузки изображения
const uploadFileInput = document.querySelector('#upload-file'); // Получили элемент загрузки фотографии
const overlay = document.querySelector('.img-upload__overlay'); // Получили overlay
const hashtagInput = document.querySelector('.text__hashtags'); // Получили поле ввода хэштегов
const commentInput = document.querySelector('.text__description'); // Получили поле ввода комментариев


// В библиотеку передаем форму, вторым параметром описываем настройки ошибок
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Получили кнопку закрытия формы
const cancelButton = document.querySelector('#upload-cancel');

// Функция открывает форму после загрузки фотографии
const showModal = () => {
  uploadFileInput.value = '';
  openModal(overlay);
};

// Функция закрывает модальное окно по клику на overlay или кнопку закрыть.
setupModalClose(overlay, cancelButton, () => {// 3-м параметром передаем колбэк с очисткой формы и сбрасыванием данных поля загрузки фото.
  uploadForm.reset(); // Сбрасываем форму перед закрытием
  pristine.reset(); // Сбрасываем валидацию
  closeModal(overlay); // Закрываем модалку
});

// Создаем объект с сообщениями об ошибках
const hashtagErrors = {
  count: `Не более ${MAX_HASHTAG_COUNT} хэштегов`,
  unique: 'Хэштеги не должны повторяться',
  invalid: 'Введен невалидный хэштег',
};

const currentErrors = []; // Создаем пустой массив для добавления ошибок

// Функция проверяет, является ли строка с тегами (value) валидной
const validateTags = (value) => {
  currentErrors.length = 0; // Обнуляем мвссив после каждой проверки
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
  const lowerCaseTags = tags.map((tag) => tag);
  if (lowerCaseTags.length !== new Set(lowerCaseTags).size) {
    currentErrors.push(hashtagErrors.unique);
    isValid = false;
  }

  // Проверка каждого хэштега
  tags.forEach((tag) => {
    const validTags = VALID_SYMBOLS.test(tag);
    if (!validTags) {
      currentErrors.push(hashtagErrors.invalid);
      isValid = false;
    }
  });

  return isValid;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const getErrorMessages = () => {
  // Убираем дубликаты ошибок
  const uniqueErrors = [...new Set(currentErrors)];
  return uniqueErrors.join(' и ');
};

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
  if (evt.target === hashtagInput || evt.target === commentInput) {
    pristine.validate();
  }
});

// Обработчик отправки формы при валидных данных
uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

// Открытие модального окна
uploadFileInput.addEventListener('change', () => {
  showModal();
});
