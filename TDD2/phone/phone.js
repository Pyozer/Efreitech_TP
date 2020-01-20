export const phoneNumberSanitizer = (phone) => {
  if (!phone) throw new Error('Phone cannot be null/undefined/empty');

  const parsed = phone.trim()
    .replace(/[^\w]/g, '')
    .replace(/^(0033|33)/g, '0');
  const isNumberValid = /^0(6|7)([0-9]{8})$/.test(parsed);
  if (!isNumberValid) {
    throw new Error('Phone provided is not valid !');
  }
  return parsed;
};
