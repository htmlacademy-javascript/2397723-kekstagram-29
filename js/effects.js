const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectItems = document.querySelectorAll('.effects__radio');
const preview = document.querySelector('.img-upload__preview').querySelector('img');

const CLASS_HIDDEN = 'hidden';

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

const resetEffectsForCloseModal = () => {
  currentEffect = 'none';
  resetEffects();
  effectItems[0].checked = true;
  imgUploadEffectLevel.classList.add(CLASS_HIDDEN);
};

const effects = () => {
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
};

export { effects, resetEffectsForCloseModal };
