import { isEscapeKey } from './utils.js';
import { request } from './request.js';
import { effects, resetEffectsForCloseModal } from './effects.js';


const imgUploadForm = document.getElementById('upload-select-image');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtag = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const preview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const effectsPreviews = imgUploadForm.querySelectorAll('.effects__preview');

const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');


const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';
const SCALE_STEP = 0.25;
const HASHTAGS_AMOUNT = 5;
const REQUEST_URL = 'https://29.javascript.pages.academy/kekstagram';

// Наложение эффектов

// Валидация

const validationErrors = {
  pattern: 'Хэштег не соответствует шаблону',
  amount: 'Максимум 5 хэштегов',
  dublicate: 'Хэштеги не могут повторяться',
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-text'
});

/**
 * @param {string} hashtag
 */
const checkHashtag = (hashtag) => {
  const lowerCaseHashtag = hashtag.toLowerCase().trim();
  const splitHashtags = lowerCaseHashtag.split(' ');
  const reg = /^#[a-zа-яё0-9]{1,19}$/i;
  const isNormalLength = splitHashtags.length <= HASHTAGS_AMOUNT;
  let noDublicates = true;
  let regTest = true;
  for (const hashtagItem of splitHashtags) {
    if (!reg.test(hashtagItem)) {
      regTest = false;
    }
    const dublicateHashtags = splitHashtags.filter((el) => el === hashtagItem);
    if (dublicateHashtags.length > 1) {
      noDublicates = false;
    }
  }
  return { isNormalLength, noDublicates, regTest };
};

pristine.addValidator(textHashtag, (value) => {
  if (value === '') {
    return true;
  }
  const test = checkHashtag(value);
  return test.regTest;
}, validationErrors.pattern, 1, false);

pristine.addValidator(textHashtag, (value) => {
  const test = checkHashtag(value);
  return test.isNormalLength;
}, validationErrors.amount, 2, true);

pristine.addValidator(textHashtag, (value) => {
  const test = checkHashtag(value);
  return test.noDublicates;
}, validationErrors.dublicate, 3, true);

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

// Подстановка загружаемого изображения, масштабирование

const createImageUrl = () => {
  const file = uploadInput.files[0];
  if (file) {
    return URL.createObjectURL(file);
  }
  return undefined;
};

/**
 * @param {number} scaleValue
 */
function changeScale(scaleValue) {
  scaleControlValue.value = `${scaleValue * 100}%`;
  preview.style.transform = `scale(${scaleValue})`;
}

let currentScale = 1;

function plusScale() {
  if (currentScale < 1) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
}

function minusScale() {
  if (currentScale > 0.25) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
}

const fillPreview = () => {
  const imageUrl = createImageUrl();
  preview.src = imageUrl;
  for (const effectsPreviewItem of effectsPreviews) {
    effectsPreviewItem.style.backgroundImage = `url(${imageUrl})`;
  }
};

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
  changeScale(1);
  uploadInput.value = '';
  resetEffectsForCloseModal();
  currentScale = 1;
  textHashtag.value = '';
  textDescription.value = '';
}

const showModal = () => {
  uploadOverlay.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', onCloseBtnClick);
  scaleControlBigger.addEventListener('click', plusScale);
  scaleControlSmaller.addEventListener('click', minusScale);
};

const initUploadForm = () => {

  effects();

  uploadInput.addEventListener('change', () => {
    showModal();
    fillPreview();
  });
};

export { initUploadForm };
