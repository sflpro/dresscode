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

export const getSeparator = (dateString) => {
  let separator;
  if (dateString.indexOf('/') > -1) {
    separator = '/';
  } else if (dateString.indexOf('-') > -1) {
    separator = '-';
  } else if (dateString.indexOf('.') > -1) {
    separator = '.';
  }

  return separator;
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

  const separator = getSeparator(dateString);

  if (!separator || format.indexOf(separator) === -1) {
    return {
      valid: false,
      error: 'Wrong separator',
      date,
    };
  }

  const dateComponents = dateString.split(separator);
  const formatComponents = format.split(separator);

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

export const isValidFormatType = format => (
  DATE_FORMATS.includes(format)
);

export const isValidFormat = (dateString, format) => {
  const separator = getSeparator(dateString);

  if (!separator || format.indexOf(separator) === -1) {
    return false;
  }

  const dateComponents = dateString.split(separator);
  const formatComponents = format.split(separator);

  if (dateComponents.length !== formatComponents.length) {
    return false;
  }

  return true;
};

export const isValidDate = (dateString, format) => {
  const separator = getSeparator(dateString);

  if (!separator || format.indexOf(separator) === -1) {
    return false;
  }

  const dateComponents = dateString.split(separator);
  const formatComponents = format.split(separator);

  if (dateComponents.length !== formatComponents.length) {
    return false;
  }

  let valid = true;
  for (let i = 0; i < formatComponents.length; i++) {
    const formatComponent = formatComponents[i];
    const dateComponent = dateComponents[i];

    switch (formatComponent) {
      case 'DD': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) <= 9))
          && Number(dateComponent) <= 31;
        break;
      }
      case 'D': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) <= 9))
          && Number(dateComponent) <= 31;
        break;
      }
      case 'MM': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) <= 9))
          && Number(dateComponent) >= 1 && Number(dateComponent) <= 12;
        break;
      }
      case 'YY': {
        valid = dateComponent.length === 2 && /^[0-9]*$/.test(dateComponent);
        break;
      }
      case 'YYYY': {
        valid = dateComponent.length === 4 && /^[0-9]*$/.test(dateComponent);
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

  return valid;
};

export const convertStringToDate = (dateString, format) => {
  if (!dateString) {
    return null;
  }

  const separator = getSeparator(dateString);
  const dateComponents = dateString.split(separator);
  const formatComponents = format.split(separator);

  const date = {
    d: null,
    m: null,
    y: null,
  };
  for (let i = 0; i < formatComponents.length; i++) {
    const formatComponent = formatComponents[i];
    const dateComponent = dateComponents[i];

    switch (formatComponent) {
      case 'DD':
      case 'D': {
        date.d = dateComponent;
        break;
      }

      case 'MM': {
        date.m = dateComponent;
        break;
      }
      case 'YY': {
        date.y = dateComponent;
        break;
      }
      case 'YYYY': {
        date.y = dateComponent;
        break;
      }
      default: {
        break;
      }
    }
  }

  if (!date.d) {
    return new Date(`${date.y}-${date.m}-01`);
  }

  return new Date(`${date.y}-${date.m}-${date.d}`);
};

export const formatDate = (date, format) => {
  if (!(date instanceof Date)) {
    return null;
  }

  const separator = getSeparator(format);
  const formatComponents = format.split(separator);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString();

  const dateParts = [];
  for (let i = 0; i < formatComponents.length; i++) {
    const formatComponent = formatComponents[i];
    switch (formatComponent) {
      case 'DD': {
        const d = day < 10 ? `0${day}` : day;
        dateParts.push(d);
        break;
      }
      case 'D': {
        dateParts.push(day);
        break;
      }
      case 'MM': {
        const m = month < 10 ? `0${month}` : month;
        dateParts.push(m);
        break;
      }
      case 'YY': {
        dateParts.push(year.substr(-2));
        break;
      }
      case 'YYYY': {
        dateParts.push(year);
        break;
      }
      default: {
        break;
      }
    }
  }

  return dateParts.join(separator);
};
