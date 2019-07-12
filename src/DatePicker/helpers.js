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

export const isValidFormatType = format => (
  DATE_FORMATS.includes(format)
);

export const isValidFormat = (dateString, format) => {
  let seperator;
  if (dateString.indexOf('/') > -1) {
    seperator = '/';
  } else if (dateString.indexOf('-') > -1) {
    seperator = '-';
  } else if (dateString.indexOf('.') > -1) {
    seperator = '.';
  }

  if (!seperator || format.indexOf(seperator) === -1) {
    return false;
  }

  const dateComponents = dateString.split(seperator);
  const formatComponents = format.split(seperator);

  if (dateComponents.length !== formatComponents.length) {
    return false;
  }

  return true;
};

export const isValidDate = (dateString, format) => {
  let seperator;
  if (dateString.indexOf('/') > -1) {
    seperator = '/';
  } else if (dateString.indexOf('-') > -1) {
    seperator = '-';
  } else if (dateString.indexOf('.') > -1) {
    seperator = '.';
  }

  if (!seperator || format.indexOf(seperator) === -1) {
    return false;
  }

  const dateComponents = dateString.split(seperator);
  const formatComponents = format.split(seperator);

  if (dateComponents.length !== formatComponents.length) {
    return false;
  }

  let valid = true;
  for (let i = 0; i < formatComponents.length; i++) {
    const formatComponent = formatComponents[i];
    const dateComponent = dateComponents[i];

    switch (formatComponent) {
      case 'DD': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
          && Number(dateComponent) <= 31;
        break;
      }
      case 'D': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
          && Number(dateComponent) <= 31;
        break;
      }
      case 'MM': {
        valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
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

  let seperator;
  if (dateString.indexOf('/') > -1) {
    seperator = '/';
  } else if (dateString.indexOf('-') > -1) {
    seperator = '-';
  } else if (dateString.indexOf('.') > -1) {
    seperator = '.';
  }

  const dateComponents = dateString.split(seperator);
  const formatComponents = format.split(seperator);

  const date = {
    d: null,
    m: null,
    y: null,
  };
  for (let i = 0; i < formatComponents.length; i++) {
    const formatComponent = formatComponents[i];
    const dateComponent = dateComponents[i];

    switch (formatComponent) {
      case 'DD': {
        date.d = dateComponent;
        break;
      }
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
