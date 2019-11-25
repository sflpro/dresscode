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

    const formatedValue = formatDate(value, format);
    const eventObj = {
      target: {
        name,
        value: formatedValue,
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
      const formatedValue = formatDate(date, format);
      const eventObj = {
        target: {
          name,
          value: formatedValue,
        },
      };
      onChange(eventObj);
    }
  }

  handleNativeDateInputChange = (event) => {
    const { onChange, format, name } = this.props;
    const { value } = event.target;
    const formatedDate = formatDate(new Date(value), format);
    const eventObj = {
      target: {
        name,
        value: formatedDate,
      },
    };
    onChange(eventObj);
  };

  handleDatePickerIconClick = (event, onClick) => {
    event.preventDefault();
    onClick(event);
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
      ...props
    } = this.props;

    const {
      open,
    } = this.state;

    const dateInputClasses = classNames({
      [styles.dateInput]: true,
      [className]: true,
    });

    const isNativeMode = isMobile();
    const dateValue = value && isValidDate(value, format) ? convertStringToDate(value, format) : undefined;

    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={(
            <DatePicker
              value={dateValue || new Date()}
              onChange={this.handleDatePickerChange}
              locale={locale}
              localeUtils={localeUtils}
              monthsShort={monthsShort}
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
                />
              )}
              hasError={hasError}
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
              />
            )}
            hasError={hasError}
          />
          <input
            value={formatDate(dateValue, DEFAULT_FORMAT) || ''}
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
  /** Array of strings, months short names */
  monthsShort: PropTypes.array,
  /** String, action that is opening date picker */
  trigger: PropTypes.string,
  /** String, decide which view of date picker must be shown(day, month, year) */
  view: PropTypes.string,
  /** Object, styles that will be passed to input */
  style: PropTypes.object,
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
};
