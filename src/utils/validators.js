export function amountValidator(n) {
  if (isNaN(n)) {
    return "Please enter numeric value";
  }

  if (n < 0) {
    return "Value can't be less than zero";
  }

  return n;
}
