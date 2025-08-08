import { debounce } from './util.js';

const PICTURES_COUNT = 10;

// Объект с фильтрами
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Находим контейнер с кнопками фильтров
const filtersElement = document.querySelector('.img-filters');

let currentFilter = ''; // Текущий активный фильтр
let pictures = []; // Моссив с фотографиями, который будет заполняться

const randomSort = () => Math.random() - 0.5;

//Сравнивает фотографии по количеству комментариев
//Сортирует по убыванию (больше комментариев - выше)
const discussedSort = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

// Функция фильтрации
const filterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT); // Перемешивает и берет первые 10 фотографий
    case Filter.DISCUSSED:
      return [...pictures].sort(discussedSort); //сортирует по количеству комментариев
    default:
      return [...pictures]; //возвращает исходный порядок
  }
};

// Фу-я активирует фильтры
const turnFilterOn = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};

// Обработка фильтров по кликам
const setOnFilterClick = (cb) => {
  const debouncedCallback = debounce(cb);

  filtersElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filtersElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    debouncedCallback(filterPictures()); // Вызывает callback с отфильтрованными фото (через debounce)
  });
};

export { setOnFilterClick, turnFilterOn, filterPictures };
