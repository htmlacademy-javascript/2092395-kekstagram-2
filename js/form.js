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
setupModalClose(overlay, cancelButton, () => { // 3-м параметром передаем колбэк с очисткой формы и сбрасыванием данных поля загрузки фото.
  uploadForm.reset(); // Сбрасываем форму перед закрытием
  uploadFileInput.value = ''; // Сбрасываем значение поля загрузки фотографии
  closeModal(overlay); // Закрываем модалку
});

// Функция добавляет решетку к хештегу
const startsWithHash = (string) => string[0] === '#';

// Функция задает параметры длины строки
const hasValidLength = (string) => string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

// Функция проверяет валидность символов (начиная со второго элемента, т.к. 1-#)
const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

// Функция принимает тег и проверяет его на соответствие параметрам
const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

// Функция проверяет кооличество хештегов (не больше и не меньше допустимого)
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

// Функция проверяет, все ли элементы в массиве уникальны
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase()); // Приводим элементы к нижнему регистру
  return lowerCaseTags.length === new Set(lowerCaseTags).size; // Сравниваем количество элементов в массиве с количеством элементов массива, очищенного от дублей с полощью set
};

// Функция проверяет, является ли строка с тегами (value) валидной по трём критериям
const validateTags = (value) => {
  const tags = value
    .trim() // убирает пробелы в начале и конце строки
    .split(' ') // разбивает строку по пробелам (возвращает массив)
    .filter((tag) => tag.trim().length); // убирает пустые строки (если были лишние пробелы)
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag); // возвращает true, только если все условия выполнены
};

// Делаем проверку передав само поле для ввода хэштега и колбэк с условием
pristine.addValidator(hashtagInput, validateTags, 'Неправильно заполнены хэштеги');

// Вешаем обработчик события на ищзменение состояния поля загрузки картинки
uploadFileInput.addEventListener('change', () => {
  showModal(); // Открываем модальное окно
});

// Вешаем обработчик события на отправку формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
