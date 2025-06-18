const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Чудесное фото',
  'Супер',
  'Завораживающий пейзаж',
  'Определенно стоит посетить это место'
];

const names = ['Анна', 'Владимир', 'Николай', 'Ксения', 'Иван'];

const getRandomNumber = (min, max) => Math.floor(Math.random() * ((Math.max(min, max) - Math.min(min, max) + 1)) + Math.min(min, max));

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

//Ф-я генерирует объект
const createPicture = (pictureIndex) => ({
  id: pictureIndex,
  url: `photos/${pictureIndex}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomNumber(15, 200),
  comments: comments,
});


const getPictures = () => {
  const arr = [];
  for (let pictureIndex = 1; pictureIndex <= 25; pictureIndex++) {
    const picture = createPicture(pictureIndex);
    arr.push(picture);
  }
  return arr;
};
console.log(getPictures());
