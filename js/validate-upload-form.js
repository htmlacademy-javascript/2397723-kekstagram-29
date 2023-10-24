const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.getElementById('upload-select-image');

const HASHTAGS_AMOUNT = 5;
const HASHTAG_REG = /^#[a-zа-яё0-9]{1,19}$/i;
const COMMENT_MAX_LENGTH = 140;

const validationErrors = {
  pattern: 'Хэштег не соответствует шаблону',
  amount: 'Максимум 5 хэштегов',
  duplicate: 'Хэштеги не могут повторяться',
  maxLength: `Не больше ${COMMENT_MAX_LENGTH} символов`
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
  const reSpaces = /\s+/;
  const splitHashtags = lowerCaseHashtag.split(reSpaces);
  const isNormalLength = splitHashtags.length <= HASHTAGS_AMOUNT;
  let noDuplicates = true;
  let regTest = true;
  for (const hashtagItem of splitHashtags) {
    if (!HASHTAG_REG.test(hashtagItem)) {
      regTest = false;
    }
    const duplicateHashtags = splitHashtags.filter((el) => el === hashtagItem);
    if (duplicateHashtags.length > 1) {
      noDuplicates = false;
    }
  }
  return { isNormalLength, noDuplicates, regTest };
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
  return test.noDuplicates;
}, validationErrors.duplicate, 3, true);

pristine.addValidator(textDescription, (value) => value.length <= COMMENT_MAX_LENGTH,
  validationErrors.maxLength, 1, true);

export { pristine };
