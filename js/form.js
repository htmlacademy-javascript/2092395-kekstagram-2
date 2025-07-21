import { openModal, closeModal, setupModalClose } from './modal-control.js';

// Получили форму загрузки изображения
const form = document.querySelector('.img-upload__form');
// Получили элемент загрузки фотографии
const uploadFileField = document.querySelector('#upload-file');
// Получили overlay
const overlay = document.querySelector('.img-upload__overlay');

// Получили кнопку закрытия формы
const cancelButton = document.querySelector('#upload-cancel');
// Функция рткрывает форму после загрузки фотографии
const showModal = () => {
  openModal(overlay);
};

uploadFileField.addEventListener('change', () => {
  showModal();
});

setupModalClose(overlay, cancelButton, () => {
  form.reset(); // Сбрасываем форму перед закрытием
  uploadFileField.value = ''; // Сбрасываем значение поля загрузки фотографии
  closeModal(overlay); // Закрываем модалку
});
