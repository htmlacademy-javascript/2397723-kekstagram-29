import { renderPictures } from './pictures.js';
import { getRandomInteger, debounce } from './utils.js';

const imgFiltersInactive = document.querySelector('.img-filters');
const filtersButtons = document.querySelectorAll('.img-filters__button');

const RANDOM_PICTURES_AMOUNT = 10;

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
  return sortedPictures.sort((a, b) => b.comments.length - a.comments.length);
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
  const oldPictures = document.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());
  filter(newPictures);
});

const filterPicturesList = (pictures) => {
  if (pictures) {
    imgFiltersInactive.classList.remove('img-filters--inactive');

    filtersButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filtersButtons.forEach((elem) => elem.classList.remove('img-filters__button--active'));
        button.classList.add('img-filters__button--active');
        refreshPictures(pictures);
      });
    });
  }
  renderPictures(pictures);
};

export { filterPicturesList };
