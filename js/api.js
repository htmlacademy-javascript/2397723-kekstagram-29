const API_BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};

const ApiPath = {
  PICTURES: '/data2',
  UPLOAD: '',
};

/**
 * @param {string} url
 * @param {object} config
 */
const apiRequest = async (url, config) => {
  const {method, payload, onSuccess, onError, onFinally, errorMessage = ''} = config;

  try {
    const res = await fetch(url, {method, ...(payload ? {body: payload} : {})});
    if (onFinally && typeof onFinally === 'function') {
      onFinally();
    }

    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(await res.json());
    }

  } catch (err) {
    if (onError && typeof onError === 'function') {
      onError(errorMessage);
    }
  }
};

/**
 * @param {
 *  {onSuccess?: Function, onError?: Function, onFinally?: Function, errorMessage?: string}
 * } config
 */
const getPictures = (config) => {
  apiRequest(
    `${API_BASE_URL}${ApiPath.PICTURES}`,
    {method: HttpMethod.GET, ...config},
  );
};

/**
 * @param {
 *  {onSuccess?: Function, onError?: Function, onFinally?: Function, payload: FormData}
 * } config
 */
const postPicture = (config) => {
  apiRequest(
    `${API_BASE_URL}${ApiPath.UPLOAD}`,
    {method: HttpMethod.POST, ...config},
  );
};

export { getPictures, postPicture };
