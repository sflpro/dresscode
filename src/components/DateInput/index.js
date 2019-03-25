import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popover } from '../Popover';
import { DatePicker } from '../DatePicker';
import { TextInput } from '../TextInput';
import { isMobile } from '../../utils';

import styles from './dateInput.css';

export class DateInput extends React.Component {
  state = {
    open: false,
  };

  handleTargetEvent = (open) => {
    this.setState({
      open,
    });
  };

  handleDatePickerChange = (value) => {
    const { onDatePickerChange } = this.props;
    this.setState(prevState => ({
      open: !prevState.open,
    }));

    onDatePickerChange(value);
  };

  render() {
    const {
      value,
      trigger = 'click',
      readOnly = true,
      onDatePickerChange,
      onDateInputChange,
      className = '',
      style,
      ...props
    } = this.props;
    const { open } = this.state;

    const dateInputClasses = classNames({
      [styles.dateInput]: true,
      [className]: true,
    });

    const isNativeMode = isMobile();

    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={
            <DatePicker
              value={value}
              onChange={this.handleDatePickerChange}
            />
          }
          onTargetEvent={this.handleTargetEvent}
          open={open}
          gap={8}
          contentRelative
          arrow
        >
          <TextInput
            onChange={onDateInputChange}
            className={dateInputClasses}
            value={value.toLocaleDateString()}
            readOnly
            style={style}
            {...props}
          />
        </Popover>
      ) : (
          <TextInput
            onChange={onDateInputChange}
            className={dateInputClasses}
            value={value.toLocaleDateString()}
            type='date'
            style={style}
            {...props}
          />
        )
    );
  }
}

DateInput.propTypes = {
  value: PropTypes.instanceOf(Date),
  trigger: PropTypes.string,
  onDatePickerChange: PropTypes.func,
  onDateInputChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.any,
};