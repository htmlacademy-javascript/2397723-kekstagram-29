/**
 * Модуль отвечающий за взаимодействие с api.
 */

/** Адрес api. */
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

/**
 * Универсальная функция, выполняющая запрос на сервер.
 * @param {string} url
 * @param {string} method
 * @param {function} onSuccess
 * @param {function} onError
 * @param {string} errorMessage
 * @param {object | null} payload
 */
const apiRequest = (url, method, onSuccess, onError, errorMessage = '', payload = null) => {
  fetch(url, {method, ...(payload ? {body: payload} : {})})
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
    onSuccess,
    onError,
    errorMessage,
  );
};

/**
 * Отправить фотографию из формы.
 * @param {function} onSuccess
 * @param {function} onError
 * @param {string} errorMessage
 * @param {object} payload
 */
export const postPicture = (onSuccess, onError, errorMessage, payload) => {
  apiRequest(
    `${API_BASE_URL}${ApiPath.UPLOAD}`,
    HttpMethod.POST,
    onSuccess,
    onError,
    errorMessage,
    payload,
  );
};
