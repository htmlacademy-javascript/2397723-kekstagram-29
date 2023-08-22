
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureFullCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureLoaderButton = bigPicture.querySelector('.comments-loader');

bigPictureFullCommentsCount.classList.add('hidden');
bigPictureLoaderButton.classList.add('hidden');

const onModalClose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }
};

const drowComments = (commentsData) => {
  commentsList.innerHTML = '';
  commentsData.forEach((picture) => {
    const commentsItem = commentTemplate.cloneNode(true);
    commentsItem.querySelector('.social__picture').src = picture.avatar;
    commentsItem.querySelector('.social__picture').alt = picture.name;
    commentsItem.querySelector('.social__text').textContent = picture.message;
    commentsList.appendChild(commentsItem);
  });
};

const onPictureClick = ({ url, description, likes, comments }) => (evt) => {
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onModalClose);

  bigPictureImage.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;

  drowComments(comments);
};

const openBigPicture = (pictureItem, pictureData) => pictureItem.addEventListener('click', onPictureClick(pictureData));

export { openBigPicture };
