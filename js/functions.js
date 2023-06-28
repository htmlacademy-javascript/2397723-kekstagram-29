function isCorrectLength (inspectedString, maxLength) {
  return inspectedString.length <= maxLength;
}

function isPailndrome (inspectedString) {
  const withoutSpacesLowerCase = inspectedString.toLowerCase().replaceAll(' ', '');
  return withoutSpacesLowerCase === withoutSpacesLowerCase.split('').reverse().join('');
}

/**
 * @param {string|number} string
 * @returns {number}
 */
function getDigits (string) {
  const searchNumber = [];
  const preparedString = string.toString().replaceAll(' ', '').split('');
  preparedString.forEach((char) => {
    const number = Number(char);
    if (!Number.isNaN(number)) {
      searchNumber.push(number);
    }
  });
  return searchNumber.length > 0 ? Number(searchNumber.join('')) : NaN;
}
