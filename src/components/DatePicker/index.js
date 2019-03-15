import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker, { LocaleUtils } from 'react-day-picker';

import { isMobile } from '../../utils';

import 'style-loader!css-loader?modules=false!react-day-picker/lib/style.css';
import styles from './datePicker.css';

const VIEW_TYPES = {
  DAY: 'day',
  MONTH: 'month',
};

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();

const DatePickerCaption = ({ selectedDay, onMonthYearChange, view = VIEW_TYPES.DAY }) => {
  const selectedDate = new Date(selectedDay);

  return (
    <div
      className={styles.caption}
      onClick={onMonthYearChange}
    >
      {view === VIEW_TYPES.DAY && (
        LocaleUtils.formatMonthTitle(selectedDate)
      )}
      {view === VIEW_TYPES.MONTH && (
        selectedDate.getFullYear()
      )}
    </div>
  );
}

const DatePickerNavBar = () => {
  return (
    <div
      className={styles.navbar}
    >

    </div>
  );
}

const MonthPicker = ({ captionElement }) => {
  // const fromMonth = new Date(currentYear, 0);
  // const toMonth = new Date(currentYear + 10, 11);
  console.log(LocaleUtils.getMonths());
  return (
    <div>
      {captionElement}
      <div>
        dfsdfdsf
      </div>
    </div>
  );
}

export class DatePicker extends React.Component {
  state = {
    month: currentMonth,
    year: currentYear,
    view: VIEW_TYPES.DAY,
  }

  handleViewChange = (view) => () => {
    this.setState({
      view,
    });
  };

  handleDayChange = () => {

  }

  render() {
    const { value = '', className, style, ...props } = this.props;
    const { month, year, view } = this.state;

    const isNativeMode = isMobile();
    const datePickerClasses = classNames({
      [styles.datePicker]: true,
    });

    if (isNativeMode) {
      return null;
    }

    return (
      <div
        className={datePickerClasses}
        style={style}
        {...props}
      >
        {view === VIEW_TYPES.DAY && (
          <DayPicker
            captionElement={({ date }) => (
              <DatePickerCaption
                selectedDay={date}
                onViewChange={this.handleViewChange(VIEW_TYPES.MONTH)}
              />
            )}
            navbarElement={
              <DatePickerNavBar
              />
            }
            onDayChange={this.handleDayChange}
            selectedDay={value}
          />
        )}
        {view === VIEW_TYPES.MONTH && (
          <MonthPicker
            selectedDay={value}
            captionElement={
              <DatePickerCaption
                year={year}
                onViewChange={this.handleViewChange(VIEW_TYPES.DAY)}
              />
            }
          />
        )}
      </div>
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.string,
};