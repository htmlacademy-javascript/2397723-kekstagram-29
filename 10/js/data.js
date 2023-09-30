import { generateCommentId, generatePhotoId, getRandomArrayElement, getRandomInteger, createRandomIdFromRangeGenerator } from './utils.js';

const OBJECTS_COUNT = 25;

const DESCRIPTIONS = {
  firstWord: [
    'истлевший',
    'зловещий',
    'заклятый',
    'превозносящий',
    'гигантский',
    'смеющийся',
    'хтонический',
    'пробужденный',
    'сладковещательный',
    'подлый'
  ],
  secondWord: [
    'попугай',
    'гром',
    'поедатель',
    'предвестник',
    'ужас',
    'пенёк',
    'морж',
    'перст',
    'тлен',
    'гигант'
  ],
  thirdWord: [
    'ярости',
    'безумия',
    'упадка',
    'горести',
    'разбоя',
    'гигантизма',
    'удачи',
    'смелости',
    'апатии',
    'вольнодумства',
  ],
};

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHORS = [
  'Консул',
  'Ламия Брон',
  'Мартин Силен',
  'Федман Кассад',
  'Сол Вайнтрауб',
  'Ленар Хойт',
];

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(AUTHORS)
});

const generateCommentsArray = () => Array.from({ length: getRandomInteger(0, 30) }, createComment);

const createPhoto = (photoIrlIdGenerator) => ({
  id: generatePhotoId(),
  url: `photos/${photoIrlIdGenerator()}.jpg`,
  description: `На фото: ${getRandomArrayElement(DESCRIPTIONS.firstWord)} ${getRandomArrayElement(DESCRIPTIONS.secondWord)} ${getRandomArrayElement(DESCRIPTIONS.thirdWord)}.`,
  likes: getRandomInteger(15, 200),
  comments: generateCommentsArray()
});

const generatePhotosArray = () => {
  const photoIrlIdGenerator = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);
  return Array.from({ length: OBJECTS_COUNT }, () => createPhoto(photoIrlIdGenerator));
};

export { generatePhotosArray };
