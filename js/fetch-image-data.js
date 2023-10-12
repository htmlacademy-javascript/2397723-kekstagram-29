import { request } from './request.js';
import { isEscapeKey } from './utils.js';
import { pristine } from './validate-upload-form.js';
import { closeModal, onDocumentKeydown } from './upload-form.js';

const imgUploadForm = document.getElementById('upload-select-image');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const REQUEST_URL = 'https://29.javascript.pages.academy/kekstagram';

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

const openSuccess = () => {
  document.body.appendChild(successMessage);
  successMessage.addEventListener('click', onSuccessBlur);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onSuccessKeydown);
};

const openError = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', onErrorKeydown);
  errorMessage.addEventListener('click', onErrorBlur);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function closeSuccess() {
  successMessage.removeEventListener('click', onSuccessBlur);
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('click', onSuccessKeydown);
  document.body.removeChild(successMessage);
  closeModal();
}

function closeError() {
  document.removeEventListener('keydown', onErrorKeydown);
  errorMessage.removeEventListener('click', onErrorBlur);
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.removeChild(errorMessage);
}

const fetchImageData = async () => {
  const formData = new FormData(imgUploadForm);
  try {
    const req = await request({url: REQUEST_URL, method: 'POST', body: formData});

    if (req) {
      unblockSubmitButton();
      openSuccess();
    } else {
      unblockSubmitButton();
      openError();
    }
  } catch (error) {
    unblockSubmitButton();
    openError();
  }
};

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    fetchImageData();
  }
});
