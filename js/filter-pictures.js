import { renderPictures } from './pictures.js';
import { getRandomInteger, debounce } from './utils.js';

const imgFiltersInactive = document.querySelector('.img-filters');
const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

const RANDOM_PICTURES_AMOUNT = 10;

let slicePictures = [];

/**
 * @param {object[]} pictures
 * @returns
 */
const randomPictures = (pictures) => {
  const previousValues = [];
  const chousenPictures = [];
  while (chousenPictures.length <= RANDOM_PICTURES_AMOUNT) {
    let currentValue = getRandomInteger(0, pictures.length - 1);
    if (previousValues.length >= RANDOM_PICTURES_AMOUNT) {
      return chousenPictures;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(0, pictures.length - 1);
    }
    previousValues.push(currentValue);
    chousenPictures.push(pictures[currentValue]);
  }
};

/**
 * @param {object[]} pictures
 */
const sortPictures = (pictures) => {
  const sortedPictures = pictures.slice();
  return sortedPictures.sort((a, b) => b.likes - a.likes);
};

/**
 * @param {object[]} pictures
 */
const filter = (pictures) => {
  const activeFilter = document.querySelector('.img-filters__button--active');

  switch (activeFilter.id) {
    case 'filter-default':
      renderPictures(pictures);
      break;
    case 'filter-random':
      renderPictures(randomPictures(pictures));
      break;
    case 'filter-discussed':
      renderPictures(sortPictures(pictures));
      break;
    default:
      return renderPictures(pictures);
  }
};

const refreshPictures = debounce((newPictures) => {
  const picturesContainer = document.querySelectorAll('.picture');
  picturesContainer.forEach((picture) => picture.remove());
  filter(newPictures);
});

const filterPicturesList = (pictures) => {
  slicePictures = pictures.slice();
  if (pictures) {
    imgFiltersInactive.classList.remove('img-filters--inactive');

    filterButtonDefault.addEventListener('click', () => {
      filterButtonDefault.classList.add('img-filters__button--active');
      filterButtonRandom.classList.remove('img-filters__button--active');
      filterButtonDiscussed.classList.remove('img-filters__button--active');
      refreshPictures(slicePictures);
    });

    filterButtonRandom.addEventListener('click', () => {
      filterButtonRandom.classList.add('img-filters__button--active');
      filterButtonDefault.classList.remove('img-filters__button--active');
      filterButtonDiscussed.classList.remove('img-filters__button--active');
      refreshPictures(slicePictures);
    });

    filterButtonDiscussed.addEventListener('click', () => {
      filterButtonDiscussed.classList.add('img-filters__button--active');
      filterButtonRandom.classList.remove('img-filters__button--active');
      filterButtonDefault.classList.remove('img-filters__button--active');
      refreshPictures(slicePictures);
    });
  }
  renderPictures(slicePictures);
};

export { filterPicturesList };
