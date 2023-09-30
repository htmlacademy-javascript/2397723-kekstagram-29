const isCorrectLength = (inspectedString, maxLength) => inspectedString.length <= maxLength;

const isPalindrome = (inspectedString) => {
  const withoutSpacesLowerCase = inspectedString.toLowerCase().replaceAll(' ', '');
  return withoutSpacesLowerCase === withoutSpacesLowerCase.split('').reverse().join('');
};

/**
 * @param {string|number} string
 * @returns {number}
 */
const getDigits = (string) => {
  const searchNumber = [];
  const preparedString = string.toString().replaceAll(' ', '').split('');
  preparedString.forEach((char) => {
    const number = Number(char);
    if (!Number.isNaN(number)) {
      searchNumber.push(number);
    }
  });
  return searchNumber.length > 0 ? Number(searchNumber.join('')) : NaN;
};

const isThereEnoughTime = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const toMinutes = (timeString) => Number(timeString.split(':')[0]) * 60 + Number(timeString.split(':')[1]);
  if (toMinutes(meetingStart) >= toMinutes(dayStart) && toMinutes(meetingStart) < toMinutes(dayEnd)) {
    return meetingDuration <= toMinutes(dayEnd) - toMinutes(meetingStart);
  }
  return false;
};
