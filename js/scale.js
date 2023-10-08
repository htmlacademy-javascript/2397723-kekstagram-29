const scaleControlValue = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const SCALE_STEP = 0.25;

/**
 * @param {number} scaleValue
 */
function changeScale(scaleValue) {
  scaleControlValue.value = `${scaleValue * 100}%`;
  preview.style.transform = `scale(${scaleValue})`;
}

let currentScale = 1;

const plusScale = () => {
  if (currentScale < 1) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
};

const minusScale = () => {
  if (currentScale > 0.25) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
};

scaleControlBigger.addEventListener('click', plusScale);
scaleControlSmaller.addEventListener('click', minusScale);

const resetScaleForCloseModal = () => {
  changeScale(1);
  currentScale = 1;
};

export { resetScaleForCloseModal };
