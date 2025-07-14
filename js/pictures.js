import { showBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  // Очищаем контейнер перед рендерингом
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());

  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = photo.id;
    const image = pictureElement.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.append(picturesFragment);

  // Добавляем обработчик клика
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      // Находим фото по ID в переданном массиве pictures
      const pictureId = parseInt(currentPicture.dataset.pictureId, 10);
      const photo = pictures.find((picture) => picture.id === pictureId);

      if (photo) {
        showBigPicture(photo);
      }
    }
  });
};

export { renderPictures };

