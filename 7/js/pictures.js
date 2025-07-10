import { showBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const renderPictures = (pictures) => {
  pictures.forEach(({ id, url, description, comments, likes}) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = id;
    const image = pictureElement.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.append(picturesFragment);
};

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    showBigPicture(currentPicture.dataset.pictureId);
  }
});


export { renderPictures };
