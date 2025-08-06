// import { getRandomPositiveInteger, getRandomArrayElement } from './util.js';

// const MESSAGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];

// const DESCRIPTIONS = [
//   'Чудесное фото',
//   'Супер',
//   'Завораживающий пейзаж',
//   'Определенно стоит посетить это место',
// ];

// const NAMES = ['Анна', 'Владимир', 'Николай', 'Ксения', 'Иван'];

// const PICTURES_COUNT = 25;
// const AVATARS_COUNT = 6;
// const MIN_LIKES = 15;
// const MAX_LIKES = 200;
// const MIN_COMMENTS = 0;
// const MAX_COMMENTS = 30;

// const createMessage = () =>
//   Array.from({ length: getRandomPositiveInteger(1, 2) }, () =>
//     getRandomArrayElement(MESSAGES)
//   ).join(' ');

// const createComment = (commentIndex) => ({
//   id: commentIndex,
//   avatar: `img/avatar-${getRandomPositiveInteger(1, AVATARS_COUNT)}.svg`,
//   message: createMessage(),
//   name: getRandomArrayElement(NAMES),
// });

// const createPicture = (pictureIndex) => ({
//   id: pictureIndex,
//   url: `photos/${pictureIndex}.jpg`,
//   description: getRandomArrayElement(DESCRIPTIONS),
//   likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
//   comments: Array.from({length: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS) }, (_, commentIndex) => createComment(commentIndex + 1)),
// });

// const getPictures = () =>
//   Array.from({ length: PICTURES_COUNT }, (_, pictureIndex) =>
//     createPicture(pictureIndex + 1)
//   );

// export { getPictures };
