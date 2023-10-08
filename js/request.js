const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'Не удалось загрузить фотографии пользователей';

export const showAlert = (message) => {
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

const request = async ({url, method = 'GET', body = null, headers = {}, toast = false}) => {
  try {
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok && toast) {
      showAlert(ALERT_MESSAGE);
    }
    return data;
  } catch (e) {
    if (toast) {
      showAlert(e.message);
    }
  }
};

export { request };
