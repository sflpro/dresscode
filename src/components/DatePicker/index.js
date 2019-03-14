import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker from 'react-day-picker';

import { isMobile } from '../../utils';

import 'react-day-picker/lib/style.css';
import styles from './datePicker.css';

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();

const DatePickerCaption = ({ month, year, onMonthYearChange }) => {
  return (
    <div onClick={onMonthYearChange}>
      <div>
        {month}
      </div>
      <div>
        {year}
      </div>
    </div>
  );
}

export class DatePicker extends React.Component {
  state = {
    month: currentMonth,
    year: currentYear,
  }
  
  handleMonthYearChange = (currentMonth, e) => {

  }

  handleDayChange = () => {

  }

  render() {
    const { value = '', className, style, ...props } = this.props;
    const { month, year } = this.state;

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
        {/* <DayPicker
          captionElement={
            <DatePickerCaption
              month={month}
              year={year}
              onMonthYearChange={this.handleMonthYearChange}
            />
          }
          onDayChange={this.handleDayChange}
        /> */}
        {value}
      </div>
    );
  }

}

DatePicker.propTypes = {
  value: PropTypes.string,
};