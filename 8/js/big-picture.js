import { isEscapeKey } from './utils.js';

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const commentTemplate = document.querySelector('#comment');
const commentItem = commentTemplate.content.querySelector('.social__comment');
const bigPictureFullCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureLoaderButton = bigPicture.querySelector('.comments-loader');

bigPictureFullCommentsCount.classList.add('hidden');
bigPictureLoaderButton.classList.add('hidden');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseBtnClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

/**
 * @param {object[]} comments
 */
const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = commentItem.cloneNode(true);
    commentElement.querySelector('.social__text').textContent = comment.message;
    const commentAvatar = commentElement.querySelector('.social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentsFragment.appendChild(commentElement);
  });
  commentsList.appendChild(commentsFragment);
};

/**
 * @param {object} picture
 */
const fillModal = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
};

const closeModal = () => {
  bigPicture.classList.add(CLASS_HIDDEN);
  document.body.classList.remove(CLASS_MODAL_OPEN);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseBtnClick);
};

const showModal = () => {
  bigPicture.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseBtnClick);
};

/**
 * @param {object} picture
 */
const openBigPicture = (picture) => {
  fillModal(picture);
  renderComments(picture.comments);
  showModal();
};

export { openBigPicture };
