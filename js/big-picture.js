import { openModal, closeModal, setupModalClose } from './modal-control.js';
import { clearComments, renderComments } from './render-comments.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.social__likes .likes-count');
const commentsCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const showBigPicture = (photo) => {

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCaption.textContent = photo.description;

  renderComments(photo.comments);

  openModal(bigPicture);
};

setupModalClose(bigPicture, bigPictureCancel, () => {
  clearComments(); // Очищаем комментарии перед закрытием
  closeModal(bigPicture); // Закрываем модалку
});

export { showBigPicture };
