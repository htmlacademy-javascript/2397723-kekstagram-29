import { isEscapeKey } from './utils.js';
import { effects, resetEffectsForCloseModal } from './effects.js';
import { resetScaleForCloseModal } from './scale.js';
import { fillPreview } from './fill-preview.js';
import { postPicture } from './api.js';
import { pristine } from './validate-upload-form.js';
import { blockSubmitButton, unblockSubmitButton, openUploadResultMessage } from './modal-notifications.js';

const imgUploadForm = document.getElementById('upload-select-image');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtag = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';

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

const initUploadFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      postPicture({
        payload: new FormData(imgUploadForm),
        onSuccess: openUploadResultMessage('success'),
        onFinally: unblockSubmitButton,
        onError: openUploadResultMessage('error'),
      });
    }
  });
};

const initUploadForm = () => {
  effects();

  uploadInput.addEventListener('change', () => {
    showModal();
    fillPreview();
  });

  initUploadFormSubmit();
};

export { initUploadForm, onDocumentKeydown, closeModal };
