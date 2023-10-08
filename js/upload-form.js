import { isEscapeKey } from './utils.js';
import { postPicture } from './api.js';

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

const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const imgUploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectItems = imgUploadForm.querySelectorAll('.effects__radio');

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

let currentEffect = 'none';
imgUploadEffectLevel.classList.add(CLASS_HIDDEN);

const resetEffects = () => {
  changeEffect(0);
  effectLevelSlider.noUiSlider.reset();
};

noUiSlider.create(effectLevelSlider, {
  start: [100],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 1
});

/**
 * @param {number} start
 * @param {number} min
 * @param {number} max
 * @param {number} step
 */
const switchSliderOpt = (start, min, max, step) => {
  effectLevelSlider.noUiSlider.updateOptions({
    start: [start],
    range: {
      'min': min,
      'max': max
    },
    step
  });
};

/**
 * @param {number} level
 */
function changeEffect(level) {
  switch (currentEffect) {
    case 'chrome':
      preview.style.filter = `grayscale(${level / 100})`;
      break;
    case 'sepia':
      preview.style.filter = `sepia(${level / 100})`;
      break;
    case 'marvin':
      preview.style.filter = `invert(${level}%)`;
      break;
    case 'phobos':
      preview.style.filter = `blur(${level}px)`;
      break;
    case 'heat':
      preview.style.filter = `brightness(${level})`;
      break;
    case 'none':
      preview.style.filter = '';
      break;
  }
}

effectLevelSlider.noUiSlider.on('update', () => {
  const effectLevel = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = effectLevel;
  changeEffect(effectLevel);
});

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

/** Инициализирует логику отправки формы изображения. */
const initUploadFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const payload = new FormData(imgUploadForm);
      postPicture(
        () => {
          unblockSubmitButton();
          openSuccess();
        },
        () => {
          unblockSubmitButton();
          openError();
        },
        '',
        payload,
      );
    }
  });
};

const initUploadForm = () => {
  for (const item of effectItems) {
    item.addEventListener('change', () => {
      currentEffect = item.value;
      resetEffects();
      if (item.value !== 'none') {
        imgUploadEffectLevel.classList.remove(CLASS_HIDDEN);
      } else {
        imgUploadEffectLevel.classList.add(CLASS_HIDDEN);
      }
      switch (currentEffect) {
        case 'phobos':
          switchSliderOpt(3, 0, 3, 0.1);
          break;
        case 'heat':
          switchSliderOpt(3, 1, 3, 0.1);
          break;
        default:
          switchSliderOpt(100, 0, 100, 1);
      }
    });
  }

  uploadInput.addEventListener('change', () => {
    showModal();
    fillPreview();
  });

  initUploadFormSubmit();
};

export { initUploadForm, onDocumentKeydown, closeModal };
