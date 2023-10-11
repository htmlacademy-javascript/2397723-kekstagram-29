import { isEscapeKey } from './utils.js';
import { onDocumentKeydown, closeModal } from './upload-form.js';

const imgUploadSubmit = document.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
};

const onSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccess();
  }
};

const onErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeError();
  }
};

const onSuccessBlur = (evt) => {
  if (evt.target === successMessage) {
    closeSuccess();
  }
};

const onErrorBlur = (evt) => {
  if (evt.target === errorMessage) {
    closeError();
  }
};

const onSuccessButtonClick = () => {
  closeSuccess();
};

const onErrorButtonClick = () => {
  closeError();
};

/**
 * @param {string} type
 */
const openUploadResultMessage = (type) => {
  switch (type) {
    case 'success':
      return () => {
        document.body.appendChild(successMessage);
        successMessage.addEventListener('click', onSuccessBlur);
        successButton.addEventListener('click', onSuccessButtonClick);
        document.removeEventListener('keydown', onDocumentKeydown);
        document.addEventListener('keydown', onSuccessKeydown);
      };
    case 'error':
      return () => {
        document.body.appendChild(errorMessage);
        document.addEventListener('keydown', onErrorKeydown);
        errorMessage.addEventListener('click', onErrorBlur);
        errorButton.addEventListener('click', onErrorButtonClick);
        document.removeEventListener('keydown', onDocumentKeydown);
      };
  }
};

function closeSuccess() {
  successMessage.removeEventListener('click', onSuccessBlur);
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('click', onSuccessKeydown);
  document.removeEventListener('keydown', onSuccessKeydown);
  document.body.removeChild(successMessage);
  closeModal();
}

function closeError() {
  document.removeEventListener('keydown', onErrorKeydown);
  errorMessage.removeEventListener('click', onErrorBlur);
  errorButton.removeEventListener('click', onErrorButtonClick);
  errorButton.removeEventListener('keydown', onErrorKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.removeChild(errorMessage);
}

export { blockSubmitButton, unblockSubmitButton, openUploadResultMessage };
