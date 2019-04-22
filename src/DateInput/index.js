import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';

import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { DatePicker } from '../DatePicker';
import {
  DATE_FORMATS,
  VALID_DATE_FORMAT,
  DEFAULT_FORMAT,
  DEFAULT_LOCALE,
} from '../DatePicker/constants';
import { validateFormat } from '../DatePicker/helpers';
import { TextInput } from '../TextInput';
import { isMobile } from '../utils';

import styles from './dateInput.css';

export class DateInput extends React.Component {
  constructor(props) {
    super(props);

    const { value, locale, format } = this.props;

    this.state = {
      open: false,
      currentValue: isValidDate(value) ? formatDate(value, format, { locale }) : value,
      hasError: false,
      error: null,
    };

    this.error = null;
    this.hasError = false;
  }

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

  handleDateInputBlur = () => {
    this.focused = false;
    const { currentValue } = this.state;

    if (!currentValue) {
      this.hasError = false;
      this.error = null;
      this.setState({
        hasError: this.hasError,
        error: this.error,
      });
    } else {
      this.setState({
        hasError: this.hasError,
        error: this.error,
        open: false,
      });
    }
  };

  handleDateInputFocus = event => (
    event.target.select()
  );

  handleDateInputChange = (event) => {
    const { onDateInputChange, format, view } = this.props;
    const { value } = event.target;

    this.focused = true;

    const { valid, error, date: { y, d, m } } = validateFormat(value, format);

    if (!valid) {
      this.error = error;
      this.hasError = true;

      this.setState({
        currentValue: value,
      });
    } else {
      this.error = null;
      this.hasError = false;

      this.setState({
        hasError: this.hasError,
        error: this.error,
        currentValue: value,
      }, () => {
        const date = view === 'month' ? `${y}-${m}-01` : `${y}-${m}-${d}`;
        onDateInputChange(new Date(date));
      });
    }
  };

  handleNativeDateInputChange = (event) => {
    const { onDateInputChange } = this.props;
    onDateInputChange(new Date(event.target.value));
  };

  handleDatePickerIconClick = (event, onClick) => {
    event.preventDefault();
    onClick(event);
  };

  render() {
    const {
      onDatePickerChange,
      onDateInputChange,
      value,
      format,
      className,
      locale,
      trigger,
      view,
      ...props
    } = this.props;

    const {
      open,
      currentValue,
      hasError,
      error,
    } = this.state;

    const dateInputClasses = classNames({
      [styles.dateInput]: true,
      [className]: true,
    });

    const isNativeMode = isMobile();

    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={(
            <DatePicker
              value={value}
              onChange={this.handleDatePickerChange}
              locale={locale}
              view={view}
            />
          )}
          onTargetEvent={this.handleTargetEvent}
          open={open}
          gap={8}
          contentRelative
        >
          {({ setOnClick }) => (
            <TextInput
              onChange={this.handleDateInputChange}
              onFocus={this.handleDateInputFocus}
              onBlur={this.handleDateInputBlur}
              className={dateInputClasses}
              value={this.focused || this.hasError ? currentValue : formatDate(value, format)}
              icon={(
                <Icon
                  name='date'
                  size={24}
                  onClick={e => this.handleDatePickerIconClick(e, setOnClick)}
                />
              )}
              hasError={hasError}
              error={error}
              {...props}
            />
          )}
        </Popover>
      ) : (
        <TextInput
          onChange={this.handleNativeDateInputChange}
          className={dateInputClasses}
          value={formatDate(value, VALID_DATE_FORMAT)}
          type='date'
          icon={(
            <Icon
              name='date'
              size={24}
            />
          )}
          hasError={hasError}
          error={error}
          {...props}
        />
      )
    );
  }
}

DateInput.propTypes = {
  /** Function, will be called when date is selected */
  onDatePickerChange: PropTypes.func.isRequired,
  /** Function, will be called when input value is changed */
  onDateInputChange: PropTypes.func.isRequired,
  /** Instance of Date, input value */
  value: PropTypes.instanceOf(Date).isRequired,
  /** String, format of date */
  format: PropTypes.oneOf(DATE_FORMATS),
  /** String, className that will be added to input */
  className: PropTypes.string,
  /** String, language of input */
  locale: PropTypes.string,
  /** String, action that is opening date picker */
  trigger: PropTypes.string,
  /** String, decide which view of date picker must be shown(day, month, year) */
  view: PropTypes.string,
  /** Object, styles that will be passed to input */
  style: PropTypes.object,
};

DateInput.defaultProps = {
  format: DEFAULT_FORMAT,
  className: '',
  locale: DEFAULT_LOCALE,
  trigger: 'click',
  view: 'day',
  style: undefined,
};
