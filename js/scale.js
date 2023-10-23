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

const onPlusScaleBtnClick = () => {
  if (currentScale < 1) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
};

const onMinusScaleBtnClick = () => {
  if (currentScale > 0.25) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
};

scaleControlBigger.addEventListener('click', onPlusScaleBtnClick);
scaleControlSmaller.addEventListener('click', onMinusScaleBtnClick);

const resetScaleForCloseModal = () => {
  changeScale(1);
  currentScale = 1;
};

export { resetScaleForCloseModal };
