import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker, { DateUtils } from 'react-day-picker';

import { MonthPicker } from '../MonthPicker';
import { DatePickerCaption } from '../DatePickerCaption';
import { DatePickerNavbar } from '../DatePickerNavbar';

import 'style-loader!css-loader?modules=false!react-day-picker/lib/style.css';
import styles from './datePickerRange.css';

const VIEW_TYPES = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
};
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class DatePickerRange extends React.Component {
  constructor(props) {
    super(props);

    const { from, to, enteredTo } = this.props;

    this.state = {
      view: VIEW_TYPES.DAY,
      year: (from || new Date()).getFullYear(),
    };

    this.initialProps = {
      from,
      to,
      enteredTo,
    };
  }

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
    if (from && to && day >= from && day <= to) {
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
  }

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

  handleMonthClick = (month, selectedDay) => {
    const day = new Date(selectedDay).setMonth(month);
    this.handleDayClick(new Date(day));
    this.handleViewChange(VIEW_TYPES.DAY);
  };

  handlePreviousYearClick = (year) => {
    this.setState({
      year: year - 1,
    });
  };

  handleNextYearClick = (year) => {
    this.setState({
      year: year + 1,
    });
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
      [styles.datePicker]: true,
      [styles.range]: true,
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

    return (
      <div
        className={datePickerClasses}
      >
        {view === VIEW_TYPES.DAY && (
          <DayPicker
            classNames={dayPickerClasses}
            captionElement={({ date }) => (
              <DatePickerCaption
                selectedDay={date}
                onClick={() => this.handleViewChange(VIEW_TYPES.MONTH)}
                view={view}
                locale={locale}
                months={months}
                localeUtils={localeUtils}
              />
            )}
            navbarElement={
              <DatePickerNavbar />
            }
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            selectedDays={[from, { from, to: enteredTo }]}
            modifiers={modifiers}
            month={from || new Date()}
            locale={locale}
            style={style}
            months={months}
            {...otherProps}
          />
        )}
        {view === VIEW_TYPES.MONTH && (
          <MonthPicker
            selectedDay={new Date()}
            captionElement={(
              <DatePickerCaption
                selectedDay={new Date(new Date().setFullYear(year))}
                onClick={() => this.handleViewChange(VIEW_TYPES.YEAR)}
                view={view}
                locale={locale}
                months={months}
                localeUtils={localeUtils}
              />
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => this.handlePreviousYearClick(year)}
                onNextClick={() => this.handleNextYearClick(year)}
              />
            )}
            onMonthClick={this.handleMonthClick}
            monthsShort={monthsShort}
            style={style}
            {...props}
          />
        )}
        {view === VIEW_TYPES.YEAR && (
          <YearPicker
            selectedDay={new Date()}
            captionElement={(
              <DatePickerCaption
                selectedDay={new Date(new Date().setFullYear(year))}
                onClick={() => this.handleViewChange(VIEW_TYPES.YEAR)}
                view={view}
                locale={locale}
                months={months}
                localeUtils={localeUtils}
              />
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => this.handlePreviousYearClick(year)}
                onNextClick={() => this.handleNextYearClick(year)}
              />
            )}
            onMonthClick={this.handleMonthClick}
            monthsShort={monthsShort}
            style={style}
            {...props}
          />
        )}
      </div>
    )
  }
}

DatePickerRange.propTypes = {
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
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
  locale: 'en',
  localeUtils: null,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  showOutsideDays: false,
  onChange: null,
  className: '',
  style: null,
};
