import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formatDate from 'date-fns/format';
import isValiDDate from 'date-fns/is_valid';

import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { DatePicker } from '../DatePicker';
import { TextInput } from '../TextInput';
import { isMobile } from '../../utils';

import styles from './dateInput.css';

const VALID_DATE_FORMAT = 'YYYY-MM-DD';

const DEFAULT_FORMAT = 'DD/MM/YYYY';

const DATE_FORMATS = [
  'DD.MM.YYYY',
  'DD.MM.YY',
  'D.MM.YYYY',
  'D.MM.YY',
  'DD/MM/YYYY',
  'DD/MM/YY',
  'D/MM/YYYY',
  'D/MM/YY',
  'DD-MM-YYYY',
  'D-MM-YYYY',
  'DD-MM-YYYY',
  'DD-MM-YY',
  'MM.YY',
  'MM.YYYY',
  'MM/YY',
  'MM/YYYY',
  'MM-YY',
  'MM-YYYY',
];

export class DateInput extends React.Component {
  constructor(props) {
    super(props);

    const { value, locale = 'en', format = DEFAULT_FORMAT } = this.props;

    this.state = {
      open: false,
      currentValue: isValiDDate(value) ? formatDate(value, format, { locale }) : value,
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

  validateFormat = (dateString, format) => {
    let date = {
      d: null,
      m: null,
      y: null,
    };

    if (!DATE_FORMATS.includes(format)) {
      return {
        valid: false,
        error: 'Wrong format',
        date,
      };
    }

    let seperator;
    if (dateString.indexOf('/') > -1) {
      seperator = '/';
    } else if (dateString.indexOf('-') > -1) {
      seperator = '-';
    } else if (dateString.indexOf('.') > -1) {
      seperator = '.';
    }

    if (!seperator || format.indexOf(seperator) === -1) {
      return {
        valid: false,
        error: 'Wrong seperator',
        date,
      };
    }

    const dateComponents = dateString.split(seperator);
    const formatComponents = format.split(seperator);

    if (dateComponents.length !== formatComponents.length) {
      return {
        valid: false,
        error: 'Wrong format',
        date,
      };
    }

    let valid;
    for (let i = 0; i < formatComponents.length; i++) {
      const formatComponent = formatComponents[i];
      const dateComponent = dateComponents[i];

      switch (formatComponent) {
        case 'DD': {
          valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
            && Number(dateComponent) <= 31;
          date.d = dateComponent;
          break;
        }
        case 'D': {
          valid = (dateComponent.length === 2 || (dateComponent.length === 1 && Number(dateComponent) < 9))
            && Number(dateComponent) <= 31;
          date.d = dateComponent;
          break;
        }
        case 'MM': {
          valid = (dateComponent.length === 2 || dateComponent.length === 1 && Number(dateComponent) < 9)
            && Number(dateComponent) >= 1 && Number(dateComponent) <= 12;
          date.m = dateComponent;
          break;
        }
        case 'YY': {
          valid = dateComponent.length === 2;
          date.y = dateComponent;
          break;
        }
        case 'YYYY': {
          valid = dateComponent.length === 4;
          date.y = dateComponent;
          break;
        }
        default: {
          valid = false;
          break;
        }
      }

      if (!valid) {
        break;
      }
    }

    return {
      valid,
      error: valid ? '' : 'Wrong date',
      date,
    };
  };

  handleDateInputBlur = (e) => {
    this.focused = false;
    const { currentValue } = this.state;

    if (!currentValue) {
      const { value } = this.props;
      this.hasError = false;
      this.error = null;
      this.setState({
        hasError: this.hasError,
        error: this.error,
        value,
      });
    } else {
      this.setState({
        hasError: this.hasError,
        error: this.error,
        open: false,
      });
    }
  };

  handleDateInputFocus = (e) => (
    event.target.select()
  );

  handleDateInputChange = (e) => {
    const { onDateInputChange, format = DEFAULT_FORMAT, view } = this.props;
    const { value } = e.target;

    this.focused = true;

    const { valid, error, date: { y, d, m } } = this.validateFormat(value, format);

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

  handleNativeDateInputChange = (e) => {
    const { onDateInputChange } = this.props;
    onDateInputChange(new Date(e.target.value));
  };

  handleDatePickerIconClick = (e, onClick) => {
    e.preventDefault();
    onClick(e);
  };

  render() {
    const {
      value,
      trigger = 'click',
      onDatePickerChange,
      onDateInputChange,
      view = 'day',
      className = '',
      locale = 'en',
      format = DEFAULT_FORMAT,
      style,
      ...props
    } = this.props;
    const { open, currentValue, hasError, error } = this.state;

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
              locale={locale}
              view={view}
            />
          }
          onTargetEvent={this.handleTargetEvent}
          open={open}
          gap={8}
          contentRelative
        >
          {({ onClick }) => (
            <TextInput
              onChange={this.handleDateInputChange}
              onFocus={this.handleDateInputFocus}
              onBlur={this.handleDateInputBlur}
              className={dateInputClasses}
              value={this.focused || this.hasError ? currentValue : formatDate(value, format)}
              icon={
                <Icon
                  name='date'
                  size={24}
                  onClick={e => this.handleDatePickerIconClick(e, onClick)}
                />
              }
              hasError={hasError}
              error={error}
              style={style}
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
            icon={
              <Icon
                name='date'
                size={24}
              />
            }
            style={style}
            {...props}
          />
        )
    );
  }
}

DateInput.propTypes = {
  value: PropTypes.instanceOf(Date),
  format: PropTypes.oneOf(DATE_FORMATS),
  locale: PropTypes.string,
  trigger: PropTypes.string,
  view: PropTypes.string,
  onDatePickerChange: PropTypes.func,
  onDateInputChange: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.any,
};