import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { DatePicker } from '../DatePicker';
import {
  DATE_FORMATS,
  VALID_DATE_FORMAT,
  DEFAULT_FORMAT,
  DEFAULT_LOCALE,
} from '../DatePicker/constants';
import {
  convertStringToDate,
  isValidFormatType,
  isValidFormat,
  isValidDate,
  formatDate,
} from '../DatePicker/helpers';
import { TextInput } from '../TextInput';
import { isMobile } from '../utils';

import styles from './dateInput.css';

export class DateInput extends React.Component {
  constructor(props) {
    super(props);

    const {
      format,
      value,
    } = this.props;

    if (!isValidFormatType(format)) {
      console.error('Invalid format type');
    }

    if (value && !isValidFormat(value, format)) {
      console.error('Invalid format');
    }

    if (value && !isValidDate(value, format)) {
      console.error('Invalid date');
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

  handleDatePickerChange = (value) => {
    const { onChange, format, name } = this.props;

    this.setState(prevState => ({
      open: !prevState.open,
    }));

    const formattedValue = formatDate(value, format);
    const eventObj = {
      target: {
        name,
        value: formattedValue,
      },
    };
    onChange(eventObj);
  };

  handleDateInputFocus = event => (
    event.target.select()
  );

  handleDateInputBlur = () => {
    const { value, hasError, format, name, onChange } = this.props;
    if (!hasError && value) {
      const date = convertStringToDate(value, format);
      const formattedValue = formatDate(date, format);
      const eventObj = {
        target: {
          name,
          value: formattedValue,
        },
      };
      onChange(eventObj);
    }
  };

  handleNativeDateInputChange = (event) => {
    const { onChange, format, name } = this.props;
    const { value } = event.target;
    const formattedDate = formatDate(new Date(value), format);
    const eventObj = {
      target: {
        name,
        value: formattedDate,
      },
    };
    onChange(eventObj);
  };

  handleDatePickerIconClick = (event, onClick) => {
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
      format,
      className,
      locale,
      localeUtils,
      monthsShort,
      trigger,
      view,
      hasError,
      disabledDays,
      disabled,
      iconClassName,
      closeOnScroll,
      initialMonth,
      ...props
    } = this.props;

    const {
      open,
    } = this.state;

    const dateInputClasses = classNames({
      [styles.dateInput]: true,
      [className]: true,
    });

    const popoverClasses = classNames({
      [styles.disabled]: disabled,
    });

    const isNativeMode = isMobile();
    const dateValue = value && isValidDate(value, format) ? convertStringToDate(value, format) : undefined;
    const datePickerValue = dateValue || initialMonth || new Date();
    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={(
            <DatePicker
              value={datePickerValue}
              onChange={this.handleDatePickerChange}
              locale={locale}
              localeUtils={localeUtils}
              monthsShort={monthsShort}
              view={view}
              disabledDays={disabledDays}
              initialMonth={initialMonth || datePickerValue}
            />
          )}
          onTargetEvent={this.handleTargetEvent}
          closeOnScroll={closeOnScroll}
          open={open}
          gap={8}
          className={popoverClasses}
          contentRelative
        >
          {({ setOnClick }) => (
            <TextInput
              {...props}
              onChange={onChange}
              onFocus={this.handleDateInputFocus}
              onBlur={this.handleDateInputBlur}
              className={dateInputClasses}
              value={value}
              icon={(
                <Icon
                  name='date'
                  size={24}
                  onClick={event => this.handleDatePickerIconClick(event, setOnClick)}
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
            onChange={this.handleNativeDateInputChange}
            className={dateInputClasses}
            value={!hasError && dateValue ? formatDate(dateValue, VALID_DATE_FORMAT) : ''}
            type='date'
            icon={(
              <Icon
                name='date'
                size={24}
                inactive={disabled}
                className={iconClassName}
              />
            )}
            hasError={hasError}
            disabled={disabled}
          />
          <input
            value={(dateValue && formatDate(dateValue, DEFAULT_FORMAT)) || ''}
            name={props.name}
            type='hidden'
          />
        </>
      )
    );
  }
}

DateInput.propTypes = {
  /** Function, will be called when date value changed */
  onChange: PropTypes.func.isRequired,
  /** String, input value */
  value: PropTypes.string,
  /** String, name of input */
  name: PropTypes.string,
  /** Boolean, whether input must be rendered with error styles */
  hasError: PropTypes.bool,
  /** String, format of date */
  format: PropTypes.oneOf(DATE_FORMATS),
  /** String, className that will be added to input */
  className: PropTypes.string,
  /** String, language of input */
  locale: PropTypes.string,
  /** Object, utils to format date value for given language */
  localeUtils: PropTypes.shape({
    formatDay: PropTypes.func.isRequired,
    formatMonthTitle: PropTypes.func.isRequired,
    formatWeekdayLong: PropTypes.func.isRequired,
    formatWeekdayShort: PropTypes.func.isRequired,
    getFirstDayOfWeek: PropTypes.func.isRequired,
  }),
  /** Date | Array of dates | function, decide which days should be disabled */
  disabledDays: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.func,
  ]),
  /** Array of strings, months short names */
  monthsShort: PropTypes.array,
  /** String, action that is opening date picker */
  trigger: PropTypes.string,
  /** String, decide which view of date picker must be shown(day, month, year) */
  view: PropTypes.string,
  /** Object, styles that will be passed to input */
  style: PropTypes.object,
  /** Boolean, whether date input is disabled */
  disabled: PropTypes.bool,
  /** String, className that will be added to icon */
  iconClassName: PropTypes.string,
  /** boolean, whether to close DatePicker on scroll */
  closeOnScroll: PropTypes.bool,
  /** Date, the month to display in the calendar at first render */
  initialMonth: PropTypes.instanceOf(Date),
};

DateInput.defaultProps = {
  name: undefined,
  hasError: false,
  format: DEFAULT_FORMAT,
  className: '',
  locale: DEFAULT_LOCALE,
  localeUtils: undefined,
  monthsShort: undefined,
  trigger: 'click',
  view: 'day',
  style: undefined,
  value: undefined,
  disabledDays: undefined,
  disabled: false,
  iconClassName: '',
  closeOnScroll: true,
  initialMonth: undefined,
};
