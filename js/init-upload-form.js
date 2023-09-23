
import { isEscapeKey } from './utils.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const imgUploadForm = document.getElementById('upload-select-image');


const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';
const SCALE_STEP = 0.25;
const HASHTAGS_AMOUNT = 5;

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

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  }
});

// Подстановка загружаемого изображения, масштабирование

const createImageUrl = () => {
  const file = uploadInput.files[0];
  if (file) {
    return URL.createObjectURL(file);
  }
};

/**
 * @param {number} currentScale
 */
function changeScale(currentScale) {
  scaleControlValue.value = `${currentScale * 100}%`;
  preview.style.transform = `scale(${currentScale})`;
}

const scale = () => {
  let currentScale = 1;
  changeScale(currentScale);
  scaleControlBigger.addEventListener('click', () => {
    if (currentScale < 1) {
      currentScale += SCALE_STEP;
      changeScale(currentScale);
    }
  });
  scaleControlSmaller.addEventListener('click', () => {
    if (currentScale > 0.25) {
      currentScale -= SCALE_STEP;
      changeScale(currentScale);
    }
  });
};

const fillPreview = () => {
  const imageUrl = createImageUrl();
  preview.src = imageUrl;
  for (const effectsPreviewItem of effectsPreviews) {
    effectsPreviewItem.style.backgroundImage = `url(${imageUrl})`;
  }
};

// Открытие-закрытие модалки

const onDocumentKeydown = (evt) => {
  if (document.activeElement !== textHashtag && document.activeElement !== textDescription) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
};

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
}

const showModal = () => {
  uploadOverlay.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', onCloseBtnClick);
};


const initUploadForm = () => {
  uploadInput.addEventListener('change', () => {
    showModal();
    fillPreview();
    scale();
  });
};

export { initUploadForm };
