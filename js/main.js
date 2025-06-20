const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Чудесное фото',
  'Супер',
  'Завораживающий пейзаж',
  'Определенно стоит посетить это место',
];

const NAMES = ['Анна', 'Владимир', 'Николай', 'Ксения', 'Иван'];

const PICTURES_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const createMessage = (array) => {
  const messagesLength = getRandomPositiveInteger(1, 2);
  const messages = [];
  for (let messageIndex = 0; messageIndex < messagesLength; messageIndex++) {
    messages.push(getRandomArrayElement(array));
  }
  return messages.join(' ');
};

const createComment = (commentIndex) => ({
  id: commentIndex,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: createMessage(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const getComments = () => {
  const commentsCount = getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];
  for (let commentIndex = 0; commentIndex < commentsCount; commentIndex++) {
    comments.push(createComment(commentIndex + 1));
  }
  return comments;
};

const createPicture = (pictureIndex) => ({
  id: pictureIndex,
  url: `photos/${pictureIndex}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: getComments(),
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
