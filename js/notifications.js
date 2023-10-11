const NOTIFICATION_SHOW_TIME = 5000;

/**
 * @param {string} message
 */
const showErrorNotification = (message) => {
  const notificationElement = document.createElement('div');
  notificationElement.style.position = 'fixed';
  notificationElement.style.top = '0';
  notificationElement.style.right = '0';
  notificationElement.style.left = '0';
  notificationElement.style.zIndex = '100';
  notificationElement.style.padding = '10px 24px';
  notificationElement.style.fontSize = '16px';
  notificationElement.style.textAlign = 'center';
  notificationElement.style.backgroundColor = 'red';

  notificationElement.textContent = message;
  document.body.append(notificationElement);

  setTimeout(() => {
    notificationElement.remove();
  }, NOTIFICATION_SHOW_TIME);
};

export { showErrorNotification };
