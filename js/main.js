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


const createIdGenerator = function () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generatePhotoUrlId = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);

const comment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(AUTHORS)
});

const similarComments = function () {
  return Array.from({ length: getRandomInteger(0, 30) }, comment);
};

const photo = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrlId()}.jpg`,
  description: `На фото: ${getRandomArrayElement(DESCRIPTIONS.firstWord)} ${getRandomArrayElement(DESCRIPTIONS.secondWord)} ${getRandomArrayElement(DESCRIPTIONS.thirdWord)}.`,
  likes: getRandomInteger(15, 200),
  comments: similarComments()
});

const similarPhotos = Array.from({ length: OBJECTS_COUNT }, photo);
