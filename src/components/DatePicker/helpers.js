import { DEFAULT_YEARS_COUNT, MONTHS } from './constants';

export const getYearsRange = (
  selectedYear,
  yearsCount = DEFAULT_YEARS_COUNT,
) => {
  const currentYear = new Date().getFullYear();
  let diff;
  if (selectedYear > currentYear) {
    diff = currentYear - yearsCount - selectedYear;
  } else {
    diff = currentYear - selectedYear;
  }

  const order = Math.floor(Math.abs(diff) / yearsCount);
  const sign = currentYear - selectedYear >= 0 ? 1 : -1;

  return Array(yearsCount).fill(0).map((e, i) => i + 1 + (currentYear - yearsCount) - sign * order * yearsCount);
};

export const formatMonthTitle = ({
  date,
  locale = 'en',
  localeUtils = null,
  months = MONTHS,
}) => {
  if (localeUtils) {
    return localeUtils.formatMonthTitle(date, locale);
  }

  return (
    `${months[date.getMonth()]} ${date.getFullYear()}`
  );
};
