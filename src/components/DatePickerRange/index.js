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

import 'style-loader!css-loader?modules=false!react-day-picker/lib/style.css';
import styles from './datePickerRange.css';

const RANGE_PICKER_PARTS = {
  FROM: 'from',
  TO: 'to',
};

export class DatePickerRange extends React.Component {
  constructor(props) {
    super(props);

    const { from, to, enteredTo } = this.props;

    this.state = {
      view: VIEW_TYPES.DAY,
      year: {
        from: (from || new Date()).getFullYear(),
        to: (to || new Date()).getFullYear(),
        enteredTo: (enteredTo || new Date()).getFullYear(),
      },
    };

    this.initialProps = {
      from,
      to,
      enteredTo,
    };

    this.selectedPicker = null;

    this.day = from || new Date();
    this.year = this.day.getFullYear();
  }

  handleDayCaptionClick = (event, view) => {
    const date = new Date(event.target.textContent);
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
      onChange({
        from: null,
        to: null,
        enteredTo: null,
      });
      return;
    }

    if (from && to && day.getTime() === from.getTime() && day.getTime() === to.getTime()) {
      this.handleResetClick();
      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      onChange({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      onChange({
        to: day,
        enteredTo: day,
      });
    }
  };

  handleDayMouseEnter = (day) => {
    const { from, to, onChange } = this.props;
    if (!this.isSelectingFirstDay(from, to, day)) {
      onChange({
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

    this.handleDayClick();
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

  handlePreviousYearClick = (year, step = 1) => {
    const nextYear = year[this.selectedPicker] - step;

    this.year = nextYear;
    this.setState(prevState => ({
      year: {
        ...prevState.year,
        [this.selectedPicker]: nextYear,
      },
    }));
  };

  handleNextYearClick = (year, step = 1) => {
    const nextYear = year[this.selectedPicker] + step;

    this.year = nextYear;
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
      enteredTo,
      locale,
      monthsShort,
      months,
      localeUtils,
      showOutsideDays,
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

    const modifiers = {
      [styles.start]: from,
      [styles.end]: enteredTo,
    };

    const datePickerClasses = classNames({
      [styles.rangeDatePicker]: true,
      [styles.disabled]: view !== VIEW_TYPES.DAY,
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
      outside: `${styles.dayPickerDayOutside}`,
      today: `${styles.dayPickerToday}`,
      selected: `${styles.dayPickerSelectedDay}`,
    };

    const pickerClasses = classNames({
      [styles.picker]: true,
      [styles[`${this.selectedPicker}`]]: true,
    });

    const selectedMonths = {
      from: (from || new Date()).getMonth(),
      enteredTo: (enteredTo || new Date()).getMonth(),
      to: (to || new Date()).getMonth(),
    };

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
              onClick={event => this.handleDayCaptionClick(event, VIEW_TYPES.YEAR)}
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
                className={styles.monthCaption}
                onClick={() => this.handleViewChange(VIEW_TYPES.YEAR)}
              >
                {year[this.selectedPicker]}
              </DatePickerCaption>
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => this.handlePreviousYearClick(year)}
                onNextClick={() => this.handleNextYearClick(year)}
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
                onPreviousClick={() => this.handlePreviousYearClick(year, DEFAULT_YEARS_COUNT)}
                onNextClick={() => this.handleNextYearClick(year, DEFAULT_YEARS_COUNT)}
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

DatePickerRange.propTypes = {
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
  enteredTo: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  localeUtils: PropTypes.shape({
    formatDay: PropTypes.func.isRequired,
    formatMonthTitle: PropTypes.func.isRequired,
    formatWeekdayLong: PropTypes.func.isRequired,
    formatWeekdayShort: PropTypes.func.isRequired,
    getFirstDayOfWeek: PropTypes.func.isRequired,
  }),
  months: PropTypes.array,
  weekdaysShort: PropTypes.array,
  monthsShort: PropTypes.array,
  showOutsideDays: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

DatePickerRange.defaultProps = {
  from: null,
  to: null,
  enteredTo: null,
  locale: 'en',
  localeUtils: null,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  showOutsideDays: false,
  onChange: null,
  className: '',
  style: null,
};
