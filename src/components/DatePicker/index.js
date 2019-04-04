import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker from 'react-day-picker';

import { Icon } from '../Icon';

import 'style-loader!css-loader?modules=false!react-day-picker/lib/style.css';
import styles from './datePicker.css';

const VIEW_TYPES = {
  DAY: 'day',
  MONTH: 'month',
};
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatMonthTitle = ({
  selectedDay,
  locale = 'en',
  localeUtils,
  months = MONTHS,
}) => {
  if (localeUtils) {
    return localeUtils.formatMonthTitle(selectedDay, locale);
  }

  return (
    `${months[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`
  );
};

const DatePickerCaption = ({
  selectedDay = new Date(),
  onViewChange = null,
  view = VIEW_TYPES.DAY,
  localeUtils,
  locale,
  months,
}) => {
  const captionWrapperClasses = classNames({
    [styles.captionWrapper]: true,
    [styles[view]]: true,
  });

  return (
    <div className={styles.caption}>
      <div
        className={captionWrapperClasses}
        onClick={onViewChange}
      >
        {view === VIEW_TYPES.DAY && (
          formatMonthTitle({ selectedDay, locale, localeUtils, months })
        )}
        {view === VIEW_TYPES.MONTH && (
          selectedDay.getFullYear()
        )}
      </div>
    </div>
  );
};

const DatePickerNavBar = ({
  onPreviousClick,
  onNextClick,
}) => {
  const leftIconStyles = classNames({
    [styles.navbarIcon]: true,
    [styles.left]: true,
  });
  const rightIconStyles = classNames({
    [styles.navbarIcon]: true,
    [styles.right]: true,
  });
  return (
    <div
      className={styles.navbar}
    >
      <Icon
        name='arrow-left'
        size={24}
        className={leftIconStyles}
        onClick={() => onPreviousClick()}
      />
      <Icon
        name='arrow-right'
        size={24}
        className={rightIconStyles}
        onClick={() => onNextClick()}
      />
    </div>
  );
};

const MonthPicker = ({
  selectedDay,
  captionElement,
  navbarElement,
  monthsShort,
  onMonthClick,
  style,
  ...props
}) => {
  const selectedMonth = selectedDay.getMonth();

  return (
    <div
      className={styles.MonthPicker}
      style={style}
      {...props}
    >
      {navbarElement}
      <div className={styles.MonthPickerMonths}>
        {captionElement}
        <div className={styles.MonthPickerBody}>
          {monthsShort.map((month, monthIndex) => {
            const monthClasses = classNames({
              [styles.MonthPickerMonth]: true,
              [styles.active]: monthIndex === selectedMonth,
            });

            return (
              <div
                className={monthClasses}
                onClick={() => onMonthClick(monthIndex, selectedDay)}
                key={monthIndex}
              >
                {month}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    const { view = VIEW_TYPES.DAY, value } = this.props;

    this.state = {
      view,
      year: (value || new Date()).getFullYear(),
    };
  }

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
    const { view } = this.props;
    const day = new Date(selectedDay).setMonth(month);
    this.handleDayClick(new Date(day));
    if (view !== VIEW_TYPES.MONTH) {
      this.handleViewChange(VIEW_TYPES.DAY);
    }
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
      value,
      locale = 'en',
      monthsShort = MONTHS_SHORT,
      months = MONTHS,
      className = '',
      style,
      onChange,
      ...props
    } = this.props;
    const { localeUtils = null } = this.props;
    const { view, year } = this.state;

    const selectedDay = value || new Date();

    const datePickerClasses = classNames({
      [styles.datePicker]: true,
      [className]: true,
    });

    const dayPickerDefaultClasses = DayPicker.defaultProps.classNames;
    const dayPickerClasses = {
      ...dayPickerDefaultClasses,
      container: `${dayPickerDefaultClasses.container} ${styles.dayPicker}`,
      wrapper: `${dayPickerDefaultClasses.wrapper} ${styles.dayPickerWrapper}`,
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
                onViewChange={() => this.handleViewChange(VIEW_TYPES.MONTH)}
                view={view}
                locale={locale}
                months={months}
                localeUtils={localeUtils}
              />
            )}
            navbarElement={
              <DatePickerNavBar />
            }
            onDayClick={this.handleDayClick}
            selectedDays={selectedDay}
            month={selectedDay}
            showOutsideDays
            locale={locale}
            style={style}
            months={months}
            {...props}
          />
        )}
        {view === VIEW_TYPES.MONTH && (
          <MonthPicker
            selectedDay={selectedDay}
            captionElement={
              <DatePickerCaption
                selectedDay={new Date(selectedDay.setFullYear(year))}
                view={view}
                locale={locale}
                months={months}
                localeUtils={localeUtils}
              />
            }
            navbarElement={
              <DatePickerNavBar
                onPreviousClick={() => this.handlePreviousYearClick(year)}
                onNextClick={() => this.handleNextYearClick(year)}
              />
            }
            onMonthClick={this.handleMonthClick}
            monthsShort={monthsShort}
            style={style}
            {...props}
          />
        )}
      </div>
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  localeUtils: PropTypes.shape({
    formatDay: PropTypes.func.isRequired,
    formatMonthTitle: PropTypes.func.isRequired,
    formatWeekdayLong: PropTypes.func.isRequired,
    formatWeekdayShort: PropTypes.func.isRequired,
    getFirstDayOfWeek: PropTypes.func.isRequired,
  }),
  months: PropTypes.array,
  weekdaysLong: PropTypes.array,
  weekdaysShort: PropTypes.array,
  firstDayOfWeek: PropTypes.number,
  view: PropTypes.oneOf(Object.values(VIEW_TYPES)),
  monthsShort: PropTypes.array,
  onChange: PropTypes.func,
};