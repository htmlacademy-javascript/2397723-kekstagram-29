const onPictureClick = ({ url, description, likes, comments }) => {
  const bigPicture = document.querySelector('.big-picture');
  const closeButton = document.querySelector('.big-picture__cancel');

  const isEscapeKey = (evt) => evt.key === 'Escape';

  const onModalClose = () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onModalClose();
    }
  };


  return (evt) => {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', onModalClose);

    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.social__caption').textContent = description;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');

    const commentsList = bigPicture.querySelector('.social__comments');
    const comment = commentsList.firstElementChild.cloneNode(true);
    commentsList.innerHTML = '';
    comments.forEach((element) => {
      const commentsElement = comment.cloneNode(true);
      commentsElement.querySelector('.social__picture').src = element.avatar;
      commentsElement.querySelector('.social__picture').alt = element.name;
      commentsElement.querySelector('.social__text').textContent = element.message;
      commentsList.appendChild(commentsElement);
    });
  };
};

export { onPictureClick };
