const uploadInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const createImageUrl = () => {
  const file = uploadInput.files[0];
  if (file) {
    return URL.createObjectURL(file);
  }
  return undefined;
};

const fillPreview = () => {
  const imageUrl = createImageUrl();
  preview.src = imageUrl;
  for (const effectsPreviewItem of effectsPreviews) {
    effectsPreviewItem.style.backgroundImage = `url(${imageUrl})`;
  }
};

export { fillPreview };
