import { openModal, closeModal, setupModalClose } from './modal-control.js';

const uploadForm = document.querySelector('.img-upload__form'); // Получили форму загрузки изображения
const uploadFileInput = document.querySelector('#upload-file'); // Получили элемент загрузки фотографии
const overlay = document.querySelector('.img-upload__overlay'); // Получили overlay
const hashtagInput = document.querySelector('.text__hashtags'); // Получили поле ввода хэштегов


const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

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
  openModal(overlay);
};

// Функция закрывает модальное окно по клику на overlay или кнопку закрыть.
setupModalClose(overlay, cancelButton, () => {// 3-м параметром передаем колбэк с очисткой формы и сбрасыванием данных поля загрузки фото.
  uploadForm.reset(); // Сбрасываем форму перед закрытием
  uploadFileInput.value = ''; // Сбрасываем значение поля загрузки фотографии
  pristine.reset(); // Сбрасываем валидацию
  closeModal(overlay); // Закрываем модалку
});

// Создаем объект с сообщениями об ошибках
const hashtagErrors = {
  count: `Не более ${MAX_HASHTAG_COUNT} хэштегов`,
  unique: 'Хэштеги не должны повторяться',
  start: 'Хэштег должен начинаться с #',
  short: `Хэштег должен содержать минимум ${MIN_HASHTAG_LENGTH} символа`,
  long: `Хэштег не может быть длиннее ${MAX_HASHTAG_LENGTH} символов`,
  symbols: 'Хэштег содержит недопустимые символы',
  empty: 'Хэштег не может состоять только из #'
};

const currentErrors = []; // Создаем пустой массив для добавления ошибок

// Функция проверяет, является ли строка с тегами (value) валидной
const validateTags = (value) => {
  currentErrors.length = 0; // Обнуляем мвссив после каждой проверки
  const tags = value
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
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  if (lowerCaseTags.length !== new Set(lowerCaseTags).size) {
    currentErrors.push(hashtagErrors.unique);
    isValid = false;
  }

  // Проверка каждого хэштега
  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      currentErrors.push(hashtagErrors.start);
      isValid = false;
      continue; // Если не начинается с #, остальные проверки бессмысленны
    }

    if (tag === '#') {
      currentErrors.push(hashtagErrors.empty);
      isValid = false;
    }

    const invalidChars = tag.slice(1).match(UNVALID_SYMBOLS);
    if (invalidChars) {
      currentErrors.push(hashtagErrors.symbols);
      isValid = false;
    }

    if (tag.length < MIN_HASHTAG_LENGTH) {
      currentErrors.push(hashtagErrors.short);
      isValid = false;
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      currentErrors.push(hashtagErrors.long);
      isValid = false;
    }
  }

  return isValid;
};

const getErrorMessages = () => {
  // Убираем дубликаты ошибок
  const uniqueErrors = [...new Set(currentErrors)];
  return uniqueErrors.join('. ');
};

// Регистрируем валидатор с кастомными сообщениями
pristine.addValidator(
  hashtagInput,
  validateTags,
  getErrorMessages
);

// Валидация при вводе
hashtagInput.addEventListener('input', () => {
  pristine.validate();
});

// Обработчик отправки формы
uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// Открытие модального окна
uploadFileInput.addEventListener('change', () => {
  showModal();
});
