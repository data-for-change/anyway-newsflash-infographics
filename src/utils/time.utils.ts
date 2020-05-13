
export function dateFormat ( date: Date | string ): string {
  let dateStr = ''
  if ( !date ) {
    console.error( 'invalid date', date )
  } else {
    if ( typeof date === 'string' ) {
      date = new Date( date );
    }
    dateStr = new Intl.DateTimeFormat( 'he-il' ).format( date );
  }
  return dateStr;
}
