import { onPictureClick } from './bigPictures.js';

const generatePictures = (array) => {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  array.forEach((element) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureElement.querySelector('.picture__comments').textContent = element.comments.length;
    pictureElement.querySelector('img').src = element.url;
    pictureElement.querySelector('img').alt = element.description;
    pictureFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', onPictureClick(element));
  });

  picturesList.appendChild(pictureFragment);
};

export { generatePictures };

