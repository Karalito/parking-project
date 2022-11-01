import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: ['YYYY MM DD', 'L']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM'
  }
};
export const TODAY_DATE = moment().utc().add(3, 'hours').startOf('day');
export const MIN_DATE = moment().utc().subtract(7, 'days').add(3, 'hours').startOf('day');
export const MAX_DATE = moment().utc().add(30, 'days').add(3, 'hours').startOf('day');
