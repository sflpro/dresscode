import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker, { DateUtils } from 'react-day-picker';

import { DEFAULT_YEARS_COUNT, VIEW_TYPES, MONTHS_SHORT, MONTHS } from '../DatePicker/constants';
import { getYearsRange, formatMonthTitle } from '../DatePicker/helpers';
import { MonthPicker } from '../MonthPicker';
import { YearPicker } from '../YearPicker';
import { DatePickerCaption } from '../DatePickerCaption';
import { DatePickerNavbar } from '../DatePickerNavbar';

import styles from './dateRangePicker.css';

const RANGE_PICKER_PARTS = {
  FROM: 'from',
  TO: 'to',
};

export class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);

    const { from, to } = this.props;

    this.state = {
      view: VIEW_TYPES.DAY,
      enteredTo: to,
      year: {
        from: (from || new Date()).getFullYear(),
        to: (to || new Date()).getFullYear(),
      },
    };

    this.initialProps = {
      from,
      to,
    };

    this.selectedPicker = null;

    this.day = from || new Date();
    this.year = this.day.getFullYear();
  }

  handleDayCaptionClick = (date, view) => {
    const selectedMonth = date.getMonth();

    if (selectedMonth === this.day.getMonth()) {
      this.selectedPicker = RANGE_PICKER_PARTS.FROM;
    } else {
      this.selectedPicker = RANGE_PICKER_PARTS.TO;
    }

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
    if (year !== stateYear[this.selectedPicker]) {
      this.setState(prevState => ({
        year: {
          ...prevState.year,
          [this.selectedPicker]: year,
        },
      }), () => {
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

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick = (day) => {
    const { onChange, from, to } = this.props;
    if (!day) {
      this.setState({
        enteredTo: null,
      }, () => {
        onChange({
          from: null,
          to: null,
        });
      });
      return;
    }

    if (from && to && day.getTime() === from.getTime() && day.getTime() === to.getTime()) {
      this.handleResetClick();
      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: null,
      }, () => {
        onChange({
          from: day,
          to: null,
        });
      });
    } else {
      this.setState({
        enteredTo: day,
      }, () => {
        onChange({
          to: day,
        });
      });
    }
  };

  handleDayMouseEnter = (day) => {
    const { from, to } = this.props;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  };

  handleResetClick = () => {
    const { onChange } = this.props;
    onChange(this.initialProps);
  }

  handleMonthClick = (month) => {
    const { year } = this.state;
    let fromMonth = month;
    if (this.selectedPicker !== RANGE_PICKER_PARTS.FROM) {
      if (fromMonth === 0) {
        fromMonth = 11;
      } else {
        fromMonth -= 1;
      }
    }

    let nextDay = new Date().setMonth(fromMonth);
    nextDay = new Date(nextDay).setFullYear(year[this.selectedPicker]);

    this.day = new Date(nextDay);
    this.selectedPicker = null;

    this.handleDayClick(this.day);
    this.handleViewChange(VIEW_TYPES.DAY);
  };

  handleYearClick = (year, view) => {
    this.year = year;
    this.setState(prevState => ({
      year: {
        ...prevState.year,
        [this.selectedPicker]: year,
      },
    }), () => {
      this.handleViewChange(view);
    });
  };

  handlePreviousYearClick = (year, step = 1, updateYear = true) => {
    const nextYear = year - step;

    if (updateYear) {
      this.year = nextYear;
    }
    this.setState(prevState => ({
      year: {
        ...prevState.year,
        [this.selectedPicker]: nextYear,
      },
    }));
  };

  handleNextYearClick = (year, step = 1, updateYear = true) => {
    const nextYear = year + step;

    if (updateYear) {
      this.year = nextYear;
    }
    this.setState(prevState => ({
      year: {
        ...prevState.year,
        [this.selectedPicker]: nextYear,
      },
    }));
  };

  render() {
    const {
      from,
      to,
      locale,
      monthsShort,
      months,
      localeUtils,
      showOutsideDays,
      className,
      pickerClassName,
      style,
      onChange,
      ...props
    } = this.props;
    const { view, year, enteredTo } = this.state;

    let otherProps = props;
    if (localeUtils) {
      otherProps = {
        ...otherProps,
        localeUtils,
      };
    }

    const modifiers = {
      [styles.dayPickerDayStart]: from,
      [styles.dayPickerDayEnd]: enteredTo,
    };

    const datePickerClasses = classNames({
      [styles.rangeDatePicker]: true,
      [styles.disabled]: view !== VIEW_TYPES.DAY,
      [className]: !!className,
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
      outside: `${styles.dayPickerDayOutside}`,
      today: `${styles.dayPickerToday}`,
      selected: `${styles.dayPickerSelectedDay}`,
    };

    const pickerClasses = classNames({
      [styles.picker]: true,
      [styles[`${this.selectedPicker}`]]: true,
      [pickerClassName]: !!pickerClassName,
    });

    const years = {
      from: getYearsRange(year.from),
      to: getYearsRange(year.to),
    };

    return (
      <div
        className={datePickerClasses}
      >
        <DayPicker
          classNames={dayPickerClasses}
          captionElement={({ date }) => (
            <DatePickerCaption
              onClick={() => this.handleDayCaptionClick(date, VIEW_TYPES.YEAR)}
            >
              {formatMonthTitle({ date, locale, localeUtils, months })}
            </DatePickerCaption>
          )}
          navbarElement={({ month, onPreviousClick, onNextClick }) => {
            this.day = month;
            return (
              <DatePickerNavbar
                month={month}
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
              />
            );
          }}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          selectedDays={[from, { from, to: enteredTo }]}
          modifiers={modifiers}
          month={this.day}
          locale={locale}
          style={style}
          months={months}
          showOutsideDays={showOutsideDays}
          {...otherProps}
        />
        {view === VIEW_TYPES.MONTH && (
          <MonthPicker
            selectedMonth={this.day.getMonth()}
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
            className={pickerClasses}
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
                {`${years[this.selectedPicker][0]} - ${years[this.selectedPicker][DEFAULT_YEARS_COUNT - 1]}`}
              </DatePickerCaption>
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => (
                  this.handlePreviousYearClick(year[this.selectedPicker], DEFAULT_YEARS_COUNT, false)
                )}
                onNextClick={() => this.handleNextYearClick(year[this.selectedPicker], DEFAULT_YEARS_COUNT, false)}
              />
            )}
            onClick={nextYear => this.handleYearClick(nextYear, VIEW_TYPES.MONTH)}
            years={years[this.selectedPicker]}
            className={pickerClasses}
            style={style}
          />
        )}
      </div>
    );
  }
}

DateRangePicker.propTypes = {
  /** Instance of Date, date range picker from value */
  from: PropTypes.instanceOf(Date),
  /** Instance of Date, date range picker to value */
  to: PropTypes.instanceOf(Date),
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
  /** String, pickerClassName that will be added to picker  element */
  pickerClassName: PropTypes.string,
  /** Object, styles that will be added to date picker */
  style: PropTypes.object,
};

DateRangePicker.defaultProps = {
  from: undefined,
  to: undefined,
  locale: 'en',
  localeUtils: null,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  showOutsideDays: false,
  onChange: null,
  className: '',
  pickerClassName: '',
  style: undefined,
};
