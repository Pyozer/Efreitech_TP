export const isogram = (str) => {
  if (str === undefined || str === null) {
    throw new Error('Input cannot be undefined');
  }

  const scannedCharacters = {};
  for (const char of str.replace(/[\W_]+/g, '').toLowerCase()) {
    if (scannedCharacters[char]) return false;
    scannedCharacters[char] = true;
  }
  return true;
};
