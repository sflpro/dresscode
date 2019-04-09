export const MONTHS = {
  hy: [
    'Հունվար‎',
    'Փետրվար',
    'Մարտ‎',
    'Ապրիլ‎',
    'Մայիս‎',
    'Հունիս‎ ',
    'Հուլիս',
    'Օգոստոս‎',
    'Սեպտեմբեր‎',
    'Հոկտեմբեր‎',
    'Նոյեմբեր‎',
    'Դեկտեմբեր‎',
  ],
};

export const MONTHS_SHORT = {
  hy: [
    'Հուն',
    'Փետ',
    'Մար',
    'Ապր',
    'Մայ',
    'Հուն',
    'Հուլ',
    'Օգ',
    'Սեպ',
    'Հոկ',
    'Նոյ',
    'Դեկ',
  ],
};

export const WEEKDAYS_LONG = {
  hy: [
    'Կիրակի',
    'Երկուշաբթի',
    'Երեքշաբթի‎',
    'Չորեքշաբթի',
    'Հինգշաբթի',
    'Ուրբաթ‎',
    'Շաբաթ',
  ],
};

export const WEEKDAYS_SHORT = {
  hy: [
    'Կիր',
    'Երկ',
    'Երք',
    'Չոր',
    'Հին',
    'Ուրբ',
    'Շաբ',
  ],
};

export const FIRST_DAY = {
  hy: 1,
};

export const formatDay = (d, locale = 'hy') => (
  `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`
);

export const formatMonthTitle = (d, locale = 'hy') => (
  `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`
);

export const formatWeekdayShort = (i, locale) => (
  WEEKDAYS_SHORT[locale][i]
);

export const formatWeekdayLong = (i, locale) => (
  WEEKDAYS_SHORT[locale][i]
);

export const getFirstDayOfWeek = locale => (
  FIRST_DAY[locale]
);
