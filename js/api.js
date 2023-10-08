/**
 * Модуль отвечающий за взаимодействие с api.
 */

/**
 * Адрес api.
 * @type {string}
 */
const API_BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};

/**
 * Пути до ресурсов, которые доступны через api.
 */
const ApiPath = {
  PICTURES: '/data',
  UPLOAD: '',
};

const apiRequest = (url, method, errorMessage, onSuccess, onError) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onError(errorMessage);
    });
}

/**
 * Загрузить фотографии пользователей.
 * @param {function} onSuccess
 * @param {function} onError
 * @param {string} errorMessage
 */
export const getPictures = (onSuccess, onError, errorMessage) => {
  apiRequest(
    `${API_BASE_URL}${ApiPath.PICTURES}`,
    HttpMethod.GET,
    errorMessage,
    onSuccess,
    onError,
  );
};
