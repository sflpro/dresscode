import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TimePicker } from '../TimePicker';
import { TextInput } from '../TextInput';
import { Popover } from '../Popover';
import { Icon } from '../Icon';

import {
  isValidTime,
} from '../TimePicker/helpers';
import { isMobile } from '../utils';

import styles from './timeInput.css';

export class TimeInput extends React.Component {
  constructor(props) {
    super(props);

    const {
      value,
    } = this.props;

    if (value && !isValidTime(value)) {
      console.error('Invalid time');
    }

    this.state = {
      open: false,
    };
  }

  handleTargetEvent = (open) => {
    this.setState({
      open,
    });
  };

  handleTimePickerChange = (value) => {
    const { onChange, name } = this.props;

    const eventObj = {
      target: {
        name,
        value,
      },
    };
    onChange(eventObj);
  };

  handleTimeInputFocus = (event) => {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus(event);
    }

    return event.target.select();
  };

  handleTimeInputBlur = (event) => {
    const { value, hasError, name, onChange, onBlur } = this.props;
    if (!hasError && value) {
      const eventObj = {
        target: {
          name,
          value,
        },
      };

      if (!isValidTime(value)) {
        eventObj.target.value = '00:00';
      }

      onChange(eventObj);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  handleNativeTimeInputChange = (event) => {
    const { onChange, name } = this.props;
    const { value } = event.target;

    const eventObj = {
      target: {
        name,
        value,
      },
    };
    onChange(eventObj);
  };

  handleTimePickerIconClick = (event, onClick) => {
    const { disabled } = this.props;
    event.preventDefault();

    if (!disabled) {
      onClick(event);
    }
  };

  render() {
    const {
      onChange,
      value,
      className,
      trigger,
      hasError,
      disabled,
      iconClassName,
      closeOnScroll,
      hoursClassName,
      minutesClassName,
      hourItemClassName,
      minuteItemClassName,
      ...props
    } = this.props;

    const {
      open,
    } = this.state;

    const timeInputClasses = classNames({
      [styles.timeInput]: true,
      [className]: true,
    });

    const popoverClasses = classNames({
      [styles.disabled]: disabled,
    });

    const isNativeMode = isMobile();
    const timeValue = value && isValidTime(value) ? value : undefined;
    const timePickerValue = timeValue || '00:00';
    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={(
            <TimePicker
              onChange={this.handleTimePickerChange}
              value={timePickerValue}
              hoursClassName={hoursClassName}
              minutesClassName={minutesClassName}
              hourItemClassName={hourItemClassName}
              minuteItemClassName={minuteItemClassName}
            />
          )}
          onTargetEvent={this.handleTargetEvent}
          closeOnScroll={closeOnScroll}
          className={popoverClasses}
          open={open}
          gap={8}
          contentRelative
        >
          {({ setOnClick }) => (
            <TextInput
              {...props}
              onChange={onChange}
              onFocus={this.handleTimeInputFocus}
              onBlur={this.handleTimeInputBlur}
              className={timeInputClasses}
              value={value}
              icon={(
                <Icon
                  name='time'
                  size={24}
                  onClick={event => this.handleTimePickerIconClick(event, setOnClick)}
                  inactive={disabled}
                  className={iconClassName}
                />
              )}
              hasError={hasError}
              disabled={disabled}
            />
          )}
        </Popover>
      ) : (
        <>
          <TextInput
            {...props}
            name={`native-${props.name || ''}`}
            onChange={this.handleNativeTimeInputChange}
            className={timeInputClasses}
            value={(!hasError && timeValue && timeValue) || ''}
            type='time'
            hasError={hasError}
            disabled={disabled}
          />
          <input
            value={timeValue || ''}
            name={props.name}
            type='hidden'
          />
        </>
      )
    );
  }
}

TimeInput.propTypes = {
  /** Function, will be called when date value changed */
  onChange: PropTypes.func.isRequired,
  /** String, input value */
  value: PropTypes.string,
  /** String, name of input */
  name: PropTypes.string,
  /** Boolean, whether input must be rendered with error styles */
  hasError: PropTypes.bool,
  /** String, className that will be added to input */
  className: PropTypes.string,
  /** String, action that is opening date picker */
  trigger: PropTypes.string,
  /** Boolean, whether date input is disabled */
  disabled: PropTypes.bool,
  /** String, className that will be added to icon */
  iconClassName: PropTypes.string,
  /** boolean, whether to close DatePicker on scroll */
  closeOnScroll: PropTypes.bool,
  /** Function, called when input is blured */
  onBlur: PropTypes.func,
  /** Function, called when input is focused */
  onFocus: PropTypes.func,
  /** String, className that will be added to hours block wrapper div element */
  hoursClassName: PropTypes.string,
  /** String, className that will be added to hour item div element */
  hourItemClassName: PropTypes.string,
  /** String, className that will be added to minutes block wrapper div element */
  minutesClassName: PropTypes.string,
  /** String, className that will be added to minute item div element */
  minuteItemClassName: PropTypes.string,
};

TimeInput.defaultProps = {
  name: undefined,
  hasError: false,
  className: '',
  hoursClassName: '',
  hourItemClassName: '',
  minutesClassName: '',
  minuteItemClassName: '',
  trigger: 'click',
  value: undefined,
  disabled: false,
  iconClassName: '',
  closeOnScroll: true,
  onBlur: undefined,
  onFocus: undefined,
};
