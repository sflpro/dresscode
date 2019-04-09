import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker from 'react-day-picker';

import { DEFAULT_YEARS_COUNT, VIEW_TYPES, MONTHS_SHORT, MONTHS, getYearsRange } from './constants';

import { MonthPicker } from '../MonthPicker';
import { YearPicker } from '../YearPicker';
import { DatePickerCaption } from '../DatePickerCaption';
import { DatePickerNavbar } from '../DatePickerNavbar';

import 'style-loader!css-loader?modules=false!react-day-picker/lib/style.css';
import styles from './datePicker.css';

const formatMonthTitle = ({
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

MonthPicker.propTypes = {
  selectedDay: PropTypes.instanceOf(Date),
  captionElement: PropTypes.any,
  navbarElement: PropTypes.any,
  monthsShort: PropTypes.array,
  onMonthClick: PropTypes.func,
  style: PropTypes.object,
};

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.year = value.getFullYear();
  
    this.state = {
      view: VIEW_TYPES.DAY,
      year: this.year,
    };
  }

  handleDayCaptionClick = (event, view) => {
    const date = new Date(event.target.textContent);

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

  handleDayClick = (day) => {
    const { onChange } = this.props;
    onChange(day);
  };

  handleMonthClick = (month, selectedDay) => {
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

  handlePreviousYearClick = (year, step = 1) => {
    const nextYear = year - step;

    this.year = nextYear;
    this.setState({
      year: nextYear,
    });
  };

  handleNextYearClick = (year, step = 1) => {
    const nextYear = year + step;

    this.year = nextYear;
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
                onClick={event => this.handleDayCaptionClick(event, VIEW_TYPES.YEAR)}
              >
                {formatMonthTitle({ date, locale, localeUtils, months })}
              </DatePickerCaption>
            )}
            navbarElement={
              <DatePickerNavbar />
            }
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
                onClick={() => this.handleViewChange(VIEW_TYPES.YEAR)}
              >
                {year}
              </DatePickerCaption>
            )}
            navbarElement={(
              <DatePickerNavbar
                onPreviousClick={() => this.handlePreviousYearClick(year)}
                onNextClick={() => this.handleNextYearClick(year)}
              />
            )}
            onClick={month => this.handleMonthClick(month, selectedDay)}
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
                onPreviousClick={() => this.handlePreviousYearClick(year, DEFAULT_YEARS_COUNT)}
                onNextClick={() => this.handleNextYearClick(year, DEFAULT_YEARS_COUNT)}
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
  value: PropTypes.instanceOf(Date).isRequired,
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

DatePicker.defaultProps = {
  locale: 'en',
  localeUtils: null,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  showOutsideDays: false,
  onChange: null,
  className: '',
  style: null,
};
