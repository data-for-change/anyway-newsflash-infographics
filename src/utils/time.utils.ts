export function dateFormat(date: Date | string): string {
  let dateStr = '';
  if (!date) {
    console.error('invalid date', date);
  } else {
    if (typeof date === 'string') {
      // using replace to support safari format: "2017-07-12 19:30:00" ===> "2017-07-12T19:30:00"
      date = new Date(date.replace(/\s/, 'T'));
    }
    dateStr = new Intl.DateTimeFormat('he-il').format(date);
  }
  return dateStr;
}
