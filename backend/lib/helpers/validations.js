
const empty = input => (input === undefined || input === '');

const isValidCard = input => {
  let sum = 0;
  const numdigits = input.length;
  const parity = numdigits % 2;

  for (let i = 0; i < numdigits; i++) {
    let digit = parseInt(input.charAt(i));
    if (i % 2 === parity) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return (sum % 10) === 0;
};

module.exports = {
  empty,
  isValidCard
};
