import { showBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Ф-я создает и отображает миниатюры в ленте
const renderPictures = (pictures) => {
  // Очищает контейнер перед рендерингом
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  // Создает контейнер, который позволяет добавлять множество элементов в DOM
  const picturesFragment = document.createDocumentFragment();
  // Цикл перебирает массив объектов pictures, где каждый объект photo содержит информацию об одной фотографии
  pictures.forEach((photo) => {
    // Создает глубокую копию шаблона
    const pictureElement = picturesTemplate.cloneNode(true);
    // Добавляет data-атрибут с уникальным ID фотографии
    pictureElement.dataset.pictureId = photo.id;

    // Заполняет копию шаблона данными
    const image = pictureElement.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    // Добавляет копию элемента во фрагмент
    picturesFragment.appendChild(pictureElement);
  });
  // Добавляет фрагмент в DOM
  picturesContainer.append(picturesFragment);

  // Добавляеn обработчик клика на контейнер с миниатюрами
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      evt.preventDefault();
      // Находим фото по ID в переданном массиве pictures
      const pictureId = Number(currentPicture.dataset.pictureId);
      const photo = pictures.find((picture) => picture.id === pictureId);

      if (photo) {
        showBigPicture(photo);
      }
    }
  });
};

export { renderPictures };

