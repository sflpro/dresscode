import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { HOURS, MINUTES } from './constants';

import styles from './timePicker.css';

export class TimePicker extends React.Component {
  handleHourClick = (hour) => {
    const { value, onChange } = this.props;

    const [, minute] = value.split(':');
    onChange(`${hour}:${minute}`);
  };

  handleMinuteClick = (minute) => {
    const { value, onChange } = this.props;

    const [hour] = value.split(':');
    onChange(`${hour}:${minute}`);
  };

  render() {
    const {
      value,
      className,
      hoursClassName,
      hourItemClassName,
      minutesClassName,
      minuteItemClassName,
    } = this.props;

    const [currentHour, currentMinute] = value.split(':');

    const timePickerClasses = classNames({
      [styles.timePicker]: true,
      [className]: !!className,
    });
    const hourClasses = classNames({
      [styles.hourBlock]: true,
      [hoursClassName]: !!hoursClassName,
    });
    const minuteClasses = classNames({
      [styles.minuteBlock]: true,
      [minutesClassName]: !!minutesClassName,
    });

    return (
      <div
        className={timePickerClasses}
      >
        <div className={hourClasses}>
          {HOURS.map(hour => (
            <div
              onClick={() => this.handleHourClick(hour)}
              role='presentation'
              className={classNames({
                [styles.listItem]: true,
                [styles.activeItem]: hour === currentHour,
                [hourItemClassName]: !!hourItemClassName,
              })}
              key={hour}
            >
              {hour}
            </div>
          ))}
        </div>
        <div className={minuteClasses}>
          {MINUTES.map(minute => (
            <div
              onClick={() => this.handleMinuteClick(minute)}
              role='presentation'
              className={classNames({
                [styles.listItem]: true,
                [styles.activeItem]: minute === currentMinute,
                [minuteItemClassName]: !!minuteItemClassName,
              })}
              key={minute}
            >
              {minute}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

TimePicker.propTypes = {
  /** String, value of time picker */
  value: PropTypes.string.isRequired,
  /** Function, will be called when time picker value is changed */
  onChange: PropTypes.func,
  /** String, className that will be added to wrapper div element */
  className: PropTypes.string,
  /** String, className that will be added to hours block wrapper div element */
  hoursClassName: PropTypes.string,
  /** String, className that will be added to hour item div element */
  hourItemClassName: PropTypes.string,
  /** String, className that will be added to minutes block wrapper div element */
  minutesClassName: PropTypes.string,
  /** String, className that will be added to minute item div element */
  minuteItemClassName: PropTypes.string,
};

TimePicker.defaultProps = {
  onChange: null,
  className: '',
  hoursClassName: '',
  hourItemClassName: '',
  minutesClassName: '',
  minuteItemClassName: '',
};
