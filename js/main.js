const messages = [
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
  'Определенно стоит посетить это место',
];

const PICTURES_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const names = ['Анна', 'Владимир', 'Николай', 'Ксения', 'Иван'];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const createMessage = (array) => {
  const messagesArrayLength = getRandomPositiveInteger(1, 2);
  const messagesArray = [];
  for (let i = 0; i < messagesArrayLength; i++) {
    messagesArray.push(getRandomArrayElement(array));
  }
  return messagesArray.join(' ');
};

const createComment = (commentIndex) => ({
  id: commentIndex,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: createMessage(messages),
  name: getRandomArrayElement(names),
});

const createCommentsArray = () => {
  const commentsCount = getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment(i + 1));
  }
  return comments;
};

const createPicture = (pictureIndex) => ({
  id: pictureIndex,
  url: `photos/${pictureIndex}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: createCommentsArray(),
});

const getPictures = () => {
  const arr = [];
  for (let pictureIndex = 0; pictureIndex < PICTURES_COUNT; pictureIndex++) {
    const picture = createPicture(pictureIndex + 1);
    arr.push(picture);
  }
  return arr;
};
getPictures();
