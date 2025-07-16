import { isEscapeKey } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.social__likes .likes-count');
// const likesCount = bigPicture.querySelector('.likes-count');
const commentsCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureOverlay = document.querySelector('.overlay');
const body = document.querySelector('body');

const showBigPicture = (photo) => {

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCaption.textContent = photo.description;

  renderComments(photo.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideBigPicture = () => {
  clearComments(); // Важно: очищаем комментарии и сбрасываем состояние
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

bigPictureOverlay.addEventListener('click', (evt) => {
  const target = evt.target;
  // Проверяем, что target - это formOverlay или крестик
  if (target === bigPictureOverlay || target === bigPictureCancel) {
    // Если да, вызываем ф-ю закрытия модального окна
    hideBigPicture();
  }
});

export { showBigPicture };
