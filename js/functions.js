function isCorrectLength (inspectedString, maxLength) {
  return inspectedString.length <= maxLength;
}

function isPolyndrome (inspectedString) {
  const withoutSpasesLowerCase = inspectedString.toLowerCase().replaceAll(' ', '');
  return withoutSpasesLowerCase === withoutSpasesLowerCase.split('').reverse().join('');
}

function getDigits (string) {
  const searchNumber = [];
  string.toString().replaceAll(' ', '').split('').map((char) => (Number(char) && searchNumber.push(char)));
  return searchNumber.length > 0 ? Number(searchNumber.join('')) : NaN;
}
