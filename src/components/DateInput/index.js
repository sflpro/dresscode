import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popover } from '../Popover';
import { DatePicker } from '../DatePicker';
import { TextInput } from '../TextInput';
import { TRIGGER_OPTIONS } from '../../utils';

import styles from './dateInput.css';

export function DateInput({
  value,
  trigger = TRIGGER_OPTIONS.CLICK,
  onDatePickerChange,
  onDateInputChange,
  className = '',
  style,
  ...props
}) {
  const dateInputClasses = classNames({
    [styles.dateInput]: true,
    [className]: true,
  });

  return (
    <Popover
      trigger={trigger}
      content={
        <DatePicker
          value={value}
          onChange={onDatePickerChange}
        />
      }
    >
      <TextInput
        onChange={onDateInputChange}
        className={dateInputClasses}
        value={value}
        style={style}
        {...props}
      />
    </Popover>
  );
}

DateInput.propTypes = {
  value: PropTypes.string,
  trigger: PropTypes.oneOf(Object.values(TRIGGER_OPTIONS)),
  onDatePickerChange: PropTypes.func,
  onDateInputChange: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.any,
};