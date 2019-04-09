import { DEFAULT_YEARS_COUNT } from './constants';

export const getYearsRange = (
  selectedYear,
  yearsCount = DEFAULT_YEARS_COUNT
) => {
  const currentYear = new Date().getFullYear();
  const rest = (currentYear - selectedYear) % yearsCount;
  const order = Math.ceil((currentYear - selectedYear) / yearsCount);
  const index = rest > 0 ? order : order + 1;

  return Array(yearsCount).fill(0).map((e, i) => i + 1 + currentYear - yearsCount * index);
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
