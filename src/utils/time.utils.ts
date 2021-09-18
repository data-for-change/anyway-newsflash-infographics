import { locales } from 'hooks/date.hooks';

export function dateFormat(date: Date | string, locale: string = locales.he): string {
  let dateStr = '';
  if (!date) {
    console.error('invalid date', date);
  } else {
    if (typeof date === 'string') {
      // using replace to support safari format: "2017-07-12 19:30:00" ===> "2017-07-12T19:30:00"
      date = new Date(date.replace(/\s/, 'T'));
    }
    dateStr = new Intl.DateTimeFormat(locale).format(date);
  }
  return dateStr;
}

export const toJsDateFormat = (date: string, time: string) => {
  //create JS date format from date: "21/03/18", hour: "23:45"
  const year = parseInt(date.substr(6, 7));
  const month = parseInt(date.substr(3, 4));
  const day = parseInt(date.substr(0, 2));
  const hour = parseInt(time.substr(0, 2));
  const minutes = parseInt(time.substr(3, 4));
  return Number(new Date(2000 + year, month - 1, day, hour, minutes));
};
