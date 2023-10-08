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
 * @param {object} config
 */
const apiRequest = (url, config) => {
  const {method, payload, onSuccess, onError, onFinally, errorMessage = ''} = config;

  fetch(url, {method, ...(payload ? {body: payload} : {})})
    .then((res) => {
      if (onFinally && typeof onFinally === 'function') {
        onFinally();
      }
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((pictures) => {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(pictures);
      }
    })
    .catch(() => {
      if (onError && typeof onError === 'function') {
        onError(errorMessage);
      }
    });
}

/**
 * Загрузить фотографии пользователей.
 * @param {
 *  {onSuccess?: Function, onError?: Function, onFinally?: Function, errorMessage?: string}
 * } config
 */
export const getPictures = (config) => {
  apiRequest(
    `${API_BASE_URL}${ApiPath.PICTURES}`,
    {method: HttpMethod.GET, ...config},
  );
};

/**
 * Отправить фотографию из формы.
 * @param {
 *  {onSuccess?: Function, onError?: Function, onFinally?: Function, payload: FormData}
 * } config
 */
export const postPicture = (config) => {
  apiRequest(
    `${API_BASE_URL}${ApiPath.UPLOAD}`,
    {method: HttpMethod.POST, ...config},
  );
};
