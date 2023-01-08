export function amountValidator(n) {
  if (isNaN(n)) {
    return "Please enter numeric value";
  }

  if (n < 0) {
    return "Value can't be less than zero";
  }

  return n;
}

export function dateValidator(d) {
  const today = new Date();
  today.setHours(12);

  if (d.length < 1) {
    return today;
  }

  if (d.length !== 10) {
    return "Invalid format";
  }

  let inputArray;
  let date;
  try {
    inputArray = d.split("/");
    date = new Date(`${inputArray[1]}/${inputArray[0]}/${inputArray[2]}`);
  } catch {
    return "Invalid format";
  }

  if (date > today) {
    return "Invoice date can not be in the future.";
  }

  date.setHours(12);

  return date;
}

export function allLetters(str) {
  if (!str.length) return false;

  const checkedStr = str.match(/\p{L}+/giu)?.toString();

  return str.length === checkedStr?.length;
}

export function isValidAge(age) {
  if (age < 18 || age > 150 || isNaN(age)) {
    return false;
  }

  return true;
}
