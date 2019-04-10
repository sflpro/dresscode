export const DEFAULT_YEARS_COUNT = 12;

export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const VIEW_TYPES = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
};

export const getYearsRange = (selectedYear, yearsCount = DEFAULT_YEARS_COUNT) => {
  const currentYear = new Date().getFullYear();
  const rest = (currentYear - selectedYear) % yearsCount;
  const order = Math.ceil((currentYear - selectedYear) / yearsCount);
  const index =  rest > 0 ? order : order + 1;

  return Array(yearsCount).fill(0).map((e, i)=> i + 1 + currentYear - yearsCount * index);
};