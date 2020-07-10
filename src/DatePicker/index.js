import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker from 'react-day-picker';

import { DEFAULT_YEARS_COUNT, VIEW_TYPES, MONTHS_SHORT, MONTHS } from './constants';
import { getYearsRange, formatMonthTitle } from './helpers';

import { DatePickerCaption } from '../DatePickerCaption';
import { DatePickerNavbar } from '../DatePickerNavbar';
import { MonthPicker } from '../MonthPicker';
import { YearPicker } from '../YearPicker';

import styles from './datePicker.css';

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    const { value, view } = this.props;
    const yearDate = value || new Date();

    this.year = yearDate.getFullYear();

    this.state = {
      view,
      year: this.year,
    };
  }

  handleDayCaptionClick = (date, view) => {
    if (this.year !== date.getFullYear()) {
      this.year = date.getFullYear();
      this.handleYearClick(this.year, view);
    } else {
      this.handleViewChange(view);
    }
  };

  handleMonthCaptionClick = (event, view) => {
    const { year: stateYear } = this.state;
    const year = new Date(event.target.textContent).getFullYear();
    if (year !== stateYear) {
      this.setState({
        year,
      }, () => {
        this.handleViewChange(view);
      });
    } else {
      this.handleViewChange(view);
    }
  };

  handleViewChange = (view) => {
    this.setState({
      view,
    });
  };

  handleDayClick = (day, modifiers = {}) => {
    const dayPickerDefaultClasses = DayPicker.defaultProps.classNames;
    const key = `${dayPickerDefaultClasses.day} ${styles.disabled}`;
    if (modifiers[key]) {
      return;
    }
    const { onChange } = this.props;
    onChange(day);
  };

  handleMonthClick = (month) => {
    const { value: selectedDay } = this.props;
    const { year } = this.state;
    const day = new Date(new Date(selectedDay).setMonth(month)).setFullYear(year);
    this.handleDayClick(new Date(day));
    this.handleViewChange(VIEW_TYPES.DAY);
  };

  handleYearClick = (year, view) => {
    this.year = year;
    this.setState({
      year,
    }, () => {
      this.handleViewChange(view);
    });
  };

  handlePreviousYearClick = (year, step = 1, updateYear = true) => {
    const nextYear = year - step;

    if (updateYear) {
      this.year = nextYear;
    }
    this.setState({
      year: nextYear,
    });
  };

  handleNextYearClick = (year, step = 1, updateYear = true) => {
    const nextYear = year + step;
    if (updateYear) {
      this.year = nextYear;
    }

    this.setState({
      year: nextYear,
    });
  };

  render() {
    const {
      value: selectedDay,
      locale,
      monthsShort,
      months,
      showOutsideDays,
      localeUtils,
      className,
      style,
      onChange,
      ...props
    } = this.props;
    const { view, year } = this.state;

    let otherProps = props;
    if (localeUtils) {
      otherProps = {
        ...otherProps,
        localeUtils,
      };
    }

    const datePickerClasses = classNames({
      [styles.datePicker]: true,
      [className]: true,
    });

    const dayPickerDefaultClasses = DayPicker.defaultProps.classNames;
    const dayPickerClasses = {
      ...dayPickerDefaultClasses,
      container: `${dayPickerDefaultClasses.container} ${styles.dayPicker}`,
      wrapper: `${dayPickerDefaultClasses.wrapper} ${styles.dayPickerWrapper}`,
      months: `${dayPickerDefaultClasses.months} ${styles.dayPickerMonths}`,
      month: `${dayPickerDefaultClasses.month} ${styles.dayPickerMonth}`,
      weekdays: `${dayPickerDefaultClasses.weekdays} ${styles.dayPickerWeekdays}`,
      weekday: `${dayPickerDefaultClasses.weekday} ${styles.dayPickerWeekday}`,
      weekdaysRow: `${dayPickerDefaultClasses.weekdaysRow} ${styles.dayPickerWeekdaysRow}`,
      week: `${dayPickerDefaultClasses.week} ${styles.dayPickerWeek}`,
      day: `${dayPickerDefaultClasses.day} ${styles.dayPickerDay}`,
      disabled: `${dayPickerDefaultClasses.day} ${styles.disabled}`,
      outside: `${styles.dayPickerDayOutside}`,
      today: `${styles.dayPickerToday}`,
      selected: `${styles.dayPickerSelectedDay}`,
    };

    const years = getYearsRange(year);

    return (
      <div
        className={datePickerClasses}
      >
        {view === VIEW_TYPES.DAY && (
          <DayPicker
            classNames={dayPickerClasses}
            captionElement={({ date }) => (
              <DatePickerCaption
                onClick={() => this.handleDayCaptionClick(date, VIEW_TYPES.YEAR)}
              >
                {formatMonthTitle({ date, locale, localeUtils, months })}
              </DatePickerCaption>
            )}
            navbarElement={({ onPreviousClick, onNextClick }) => (
              <DatePickerNavbar
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
              />
            )}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            selectedDays={selectedDay}
            month={selectedDay}
            locale={locale}
            showOutsideDays={showOutsideDays}
            style={style}
            months={months}
            {...otherProps}
          />
        )}
        {view === VIEW_TYPES.MONTH && (
          <MonthPicker
            selectedMonth={selectedDay.getMonth()}
            captionElement={(
              <DatePickerCaption
                onClick={event => this.handleMonthCaptionClick(event, VIEW_TYPES.YEAR)}
              >
                {this.year}
              </DatePickerCaption>
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => this.handlePreviousYearClick(this.year)}
                onNextClick={() => this.handleNextYearClick(this.year)}
              />
            )}
            onClick={this.handleMonthClick}
            months={monthsShort}
            style={style}
          />
        )}
        {view === VIEW_TYPES.YEAR && (
          <YearPicker
            selectedYear={this.year}
            captionElement={(
              <DatePickerCaption
                onClick={() => this.handleViewChange(VIEW_TYPES.MONTH)}
              >
                {`${years[0]} - ${years[DEFAULT_YEARS_COUNT - 1]}`}
              </DatePickerCaption>
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => this.handlePreviousYearClick(year, DEFAULT_YEARS_COUNT, false)}
                onNextClick={() => this.handleNextYearClick(year, DEFAULT_YEARS_COUNT, false)}
              />
            )}
            onClick={nextYear => this.handleYearClick(nextYear, VIEW_TYPES.MONTH)}
            years={years}
            style={style}
          />
        )}
      </div>
    );
  }
}

DatePicker.propTypes = {
  /** Instance of Date, value of date picker */
  value: PropTypes.instanceOf(Date).isRequired,
  /** String, language of date picker */
  locale: PropTypes.string,
  /** Object, utils to format date value for given language */
  localeUtils: PropTypes.shape({
    formatDay: PropTypes.func.isRequired,
    formatMonthTitle: PropTypes.func.isRequired,
    formatWeekdayLong: PropTypes.func.isRequired,
    formatWeekdayShort: PropTypes.func.isRequired,
    getFirstDayOfWeek: PropTypes.func.isRequired,
  }),
  /** Date | Array of dates | function, decide which days should be disabled */
  disabledDays: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.func,
  ]),
  /** Array of strings, months names */
  months: PropTypes.array,
  /** Array of strings, months short names */
  monthsShort: PropTypes.array,
  /** Boolean, show days that are not from previous and next months */
  showOutsideDays: PropTypes.bool,
  /** Function, will be called when date picker value is changed */
  onChange: PropTypes.func,
  /** String, className that will be added to wrapper div element */
  className: PropTypes.string,
  /** Object, styles that will be added to date picker */
  style: PropTypes.object,
  /** String, view type of date picker */
  view: PropTypes.oneOf(['day', 'month', 'year']),
};

DatePicker.defaultProps = {
  locale: 'en',
  localeUtils: null,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  showOutsideDays: true,
  onChange: null,
  className: '',
  style: undefined,
  view: 'day',
  disabledDays: undefined,
};
