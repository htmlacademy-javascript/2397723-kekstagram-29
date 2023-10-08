import { isEscapeKey } from './utils.js';
import { request } from './request.js';
import { effects, resetEffectsForCloseModal } from './effects.js';
import { resetScaleForCloseModal } from './scale.js';
import { fillPreview } from './fill-preview.js';
import { pristine } from './validate-upload-form.js';


const imgUploadForm = document.getElementById('upload-select-image');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtag = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');


const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');


const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';
const REQUEST_URL = 'https://29.javascript.pages.academy/kekstagram';

// Наложение эффектов

// Валидация


// Отправка данных

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

// Подстановка загружаемого изображения

// Открытие-закрытие модалки

function onDocumentKeydown(evt) {
  if (document.activeElement !== textHashtag && document.activeElement !== textDescription) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
}

const onCloseBtnClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

function closeModal() {
  uploadOverlay.classList.add(CLASS_HIDDEN);
  document.body.classList.remove(CLASS_MODAL_OPEN);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', onCloseBtnClick);
  uploadInput.value = '';
  resetEffectsForCloseModal();
  resetScaleForCloseModal();
  textHashtag.value = '';
  textDescription.value = '';
}

const showModal = () => {
  uploadOverlay.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', onCloseBtnClick);
};

const initUploadForm = () => {

  effects();

  uploadInput.addEventListener('change', () => {
    showModal();
    fillPreview();
  });
};

export { initUploadForm };
