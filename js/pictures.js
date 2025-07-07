import { getPictures } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userPictures = getPictures();
const picturesFragment = document.createDocumentFragment();

userPictures.forEach(({ url, description, comments, likes}) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  picturesFragment.appendChild(pictureElement);
});

picturesContainer.append(picturesFragment);

export { userPictures };
