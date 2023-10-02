import { filteredPicturesList } from './filtered-pictures-list.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const fetchPictures = () => {
  try {
    fetch('https://29.javascript.pages.academy/kekstagram/data')
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((picturesList) => filteredPicturesList(picturesList));
        } else {
          showAlert('Не удалось загрузить фотографии пользователей');
        }
      });
  } catch (error) {
    showAlert(error.message);
  }
};

export { fetchPictures };
