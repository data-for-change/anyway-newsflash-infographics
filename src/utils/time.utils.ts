export function dateFormat(date: Date| string): string {
  let dateStr = '';
  if(!date) {
    console.error('invalid date', date);
  } else {
    if(typeof date === 'string') {
      date = new Date(date);
    }
    dateStr = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
  }
  return dateStr;
}