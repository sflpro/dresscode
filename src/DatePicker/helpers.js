import { DEFAULT_YEARS_COUNT, MONTHS, DATE_FORMATS } from './constants';

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

export const validateFormat = (dateString, format) => {
  const date = {
    d: null,
    m: null,
    y: null,
  };

  if (!DATE_FORMATS.includes(format)) {
    return {
      valid: false,
      error: 'Wrong format',
      date,
    };
  }

  let seperator;
  if (dateString.indexOf('/') > -1) {
    seperator = '/';
  } else if (dateString.indexOf('-') > -1) {
    seperator = '-';
  } else if (dateString.indexOf('.') > -1) {
    seperator = '.';
  }

  if (!seperator || format.indexOf(seperator) === -1) {
    return {
      valid: false,
      error: 'Wrong seperator',
      date,
    };
  }

  const dateComponents = dateString.split(seperator);
  const formatComponents = format.split(seperator);

  if (dateComponents.length !== formatComponents.length) {
    return {
      valid: false,
      error: 'Wrong format',
      date,
    };
  }

  let valid;
  for (let i = 0; i < formatComponents.length; i++) {
    const formatComponent = formatComponents[i];
    const dateComponent = dateComponents[i];

    switch (formatComponent) {
      case 'DD': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
          && Number(dateComponent) <= 31;
        date.d = dateComponent;
        break;
      }
      case 'D': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
          && Number(dateComponent) <= 31;
        date.d = dateComponent;
        break;
      }
      case 'MM': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
          && Number(dateComponent) >= 1 && Number(dateComponent) <= 12;
        date.m = dateComponent;
        break;
      }
      case 'YY': {
        valid = dateComponent.length === 2;
        date.y = dateComponent;
        break;
      }
      case 'YYYY': {
        valid = dateComponent.length === 4;
        date.y = dateComponent;
        break;
      }
      default: {
        valid = false;
        break;
      }
    }

    if (!valid) {
      break;
    }
  }

  return {
    valid,
    error: valid ? '' : 'Wrong date',
    date,
  };
};
