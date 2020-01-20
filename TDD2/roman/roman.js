export const roman = (value) => {
  if (!value && value !== 0) throw new Error('Value cannot be null/undefined');
  if (value > 4000) throw new Error('Overflow');
  if (value <= 0) return '';

  if (value <= 3) return [...Array(value)].map(() => 'I').join('');
  if (value <= 8) return `${roman(5 - value)}V${roman(value - 5)}`;
  if (value < 40) return `${roman(10 - value)}X${roman(value - 10)}`;
  if (value < 50) return `XL${roman(value - 40)}`;
  if (value < 90) return `L${roman(value - 50)}`;
  if (value < 100) return `XC${roman(value - 90)}`;
  if (value < 400) return `C${roman(value - 100)}`;
  if (value < 500) return `CD${roman(value - 400)}`;
  if (value < 900) return `D${roman(value - 500)}`;
  if (value < 1000) return `CM${roman(value - 900)}`;

  return `M${roman(value - 1000)}`;
};
