import moment from 'moment';

export const timeFormat = 'h:mm A';
export const dateFormat = 'MMMM D, YYYY';
export const dateTimeFormat = 'DD/MM/YY | h:mm A';
export const longDateFormat = 'dddd, MMMM D, YYYY h:mm A';

export const processDate = (createdAt) => {
  const date = moment(createdAt);
  const diffHours = moment().diff(date, 'hours');
  if (diffHours < 24) {
    return `Today at ${date.format(timeFormat)}`;
  } else if (diffHours < 48 && diffHours >= 24) {
    return `Yesterday at ${date.format(timeFormat)}`;
  }
  return date.format(dateTimeFormat);
};
