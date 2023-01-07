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
    console.log("VALIDATEOR", date, today, inputArray);
  } catch {
    return "Invalid format";
  }

  if (date > today) {
    return "Invoice date can not be in the future.";
  }

  date.setHours(12);

  return date;
}
