function addLeadingZero(number) {
  return (number < 10) ? '0' + number : number;
}

export function dateFilter(value) {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = addLeadingZero(date.getMonth());
  let day = addLeadingZero(date.getDate());
  let hours = addLeadingZero(date.getHours());
  let minutes = addLeadingZero(date.getMinutes());
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}