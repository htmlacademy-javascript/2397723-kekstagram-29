const generatePictures = (array) => {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  array.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('img').alt = description;
    pictureFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(pictureFragment);
};

export { generatePictures };
