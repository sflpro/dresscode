import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';

import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { DateRangePicker } from '../DateRangePicker';
import {
  DATE_FORMATS,
  VALID_DATE_FORMAT,
  DEFAULT_FORMAT,
  DEFAULT_LOCALE,
} from '../DatePicker/constants';
import { validateFormat } from '../DatePicker/helpers';
import { TextInput } from '../TextInput';
import { isMobile } from '../utils';

import styles from './dateRangeInput.css';

export class DateRangeInput extends React.Component {
  constructor(props) {
    super(props);

    const { from, to, locale, format } = this.props;

    this.error = {
      from: null,
      to: null,
    };

    this.hasError = {
      from: false,
      to: false,
    };

    this.state = {
      open: false,
      currentValues: {
        from: from && isValidDate(from) ? formatDate(from, format, { locale }) : from,
        to: to && isValidDate(to) ? formatDate(to, format, { locale }) : to,
      },
      hasError: {
        ...this.hasError,
      },
      error: {
        ...this.error,
      },
    };

    this.focused = {
      from: false,
      to: false,
    };
  }

  getRangeUpdatedValues = ({ picker, value }) => {
    const { from, to } = this.props;
    let rangeValues = {};

    if (picker === 'from') {
      if (to && to < value) {
        rangeValues.to = value;
      };
    } else {
      if (from && from > value) {
        rangeValues.from = value;
      };
    }

    return rangeValues;
  };

  setNativeInputRef = (ref, selectedPicker) => {
    this[`native${selectedPicker}Input`] = ref;
  };

  handleTargetEvent = (open) => {
    this.setState({
      open,
    });
  };

  handleDateRangePickerChange = (date) => {
    const { onDatePickerChange } = this.props;
    const { to } = date;

    if (to) {
      this.setState({
        open: false,
      });
    }
    onDatePickerChange(date);
  };

  handleDateInputBlur = (selectedPicker) => {
    const { from, to, onDateInputChange } = this.props;
    const { currentValues } = this.state;

    let selectedPickerValue;
    if (selectedPicker === 'from') {
      selectedPickerValue = from;
    } else {
      selectedPickerValue = to;
    }

    this.focused[selectedPicker] = false;

    if (!currentValues[selectedPicker]) {
      this.hasError[selectedPicker] = false;
      this.error[selectedPicker] = null;

      this.setState(prevState => ({
        hasError: {
          ...prevState.hasError,
          ...this.hasError,
        },
        error: {
          ...prevState.error,
          ...this.error,
        },
        currentValues: {
          ...prevState.currentValues,
          [selectedPicker]: selectedPickerValue,
        },
      }));
    } else {
      this.setState(prevState => ({
        hasError: {
          ...prevState.hasError,
          ...this.hasError,
        },
        error: {
          ...prevState.error,
          ...this.error,
        },
        open: false,
      }), () => {
        const rangeValues = this.getRangeUpdatedValues({
          picker: selectedPicker,
          value: selectedPickerValue,
        });

        if (Object.keys(rangeValues)) {
          onDateInputChange(rangeValues);
        }
      });
    }
  };

  handleDateInputFocus = (event) => (
    event.target.select()
  );

  handleDateInputChange = (event, selectedPicker) => {
    const { onDateInputChange, format } = this.props;
    const { value } = event.target;

    this.focused[selectedPicker] = true;

    const { valid, error, date: { y, d, m } } = validateFormat(value, format);

    if (!valid) {
      this.error[selectedPicker] = error;
      this.hasError[selectedPicker] = true;

      this.setState(prevState => ({
        currentValues: {
          ...prevState.currentValues,
          [selectedPicker]: value,
        },
      }));
    } else {
      this.error[selectedPicker] = null;
      this.hasError[selectedPicker] = false;

      this.setState(prevState => ({
        hasError: {
          ...prevState.hasError,
          ...this.hasError,
        },
        error: {
          ...prevState.error,
          ...this.error,
        },
        currentValues: {
          ...prevState.currentValues,
          [selectedPicker]: value,
        },
      }), () => {
        onDateInputChange({
          [selectedPicker]: new Date(`${y}-${m}-${d}`)
        });
      });
    }
  };

  handleNativeDateInputChange = (event, selectedPicker) => {
    const { onDateInputChange } = this.props;
    const { value } = event.target;

    const rangeValues = this.getRangeUpdatedValues({
      picker: selectedPicker,
      value: new Date(value),
    });

    rangeValues[selectedPicker] = new Date(value);

    onDateInputChange(rangeValues);
  };

  handleNativeDateInputBlur = (selectedPicker) => {
    if (selectedPicker === 'from') {
      this.nativetoInput.focus();
    }
  };

  handleDatePickerIconClick = (event, onClick) => {
    event.preventDefault();
    onClick(event);
  };

  render() {
    const {
      onDatePickerChange,
      onDateInputChange,
      from,
      to,
      format,
      className,
      locale,
      trigger,
      style,
      ...props
    } = this.props;
    const { open, hasError, error, currentValues } = this.state;

    const dateRangeInputClasses = classNames({
      [styles.dateRangeInput]: true,
      [className]: true,
    });

    const isNativeMode = isMobile();
    const inputValues = {
      from: from ? (this.focused.from || this.hasError.from ? currentValues.from : formatDate(from, format)) : '',
      to: to ? (this.focused.to || this.hasError.to ? currentValues.to : formatDate(to, format)) : '',
    };

    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={(
            <DateRangePicker
              onChange={this.handleDateRangePickerChange}
              numberOfMonths={2}
              from={from}
              to={to}
              locale={locale}
            />
          )}
          onTargetEvent={this.handleTargetEvent}
          open={open}
          gap={8}
          contentRelative
        >
          {({ setOnClick }) => (
            <div className={styles.dateRangeInputWrapper}>
              <div>
                <TextInput
                  onChange={event => this.handleDateInputChange(event, 'from')}
                  onFocus={event => this.handleDateInputFocus(event, 'from')}
                  onBlur={() => this.handleDateInputBlur('from')}
                  className={dateRangeInputClasses}
                  value={inputValues.from}
                  icon={
                    <Icon
                      name='date'
                      size={24}
                      onClick={e => this.handleDatePickerIconClick(e, setOnClick)}
                    />
                  }
                  hasError={hasError.from}
                  error={error.from}
                  style={style}
                  {...props}
                />
              </div>
              <span className={styles.seperator}>
                -
              </span>
              <div>
                <TextInput
                  onChange={event => this.handleDateInputChange(event, 'to')}
                  onFocus={event => this.handleDateInputFocus(event, 'to')}
                  onBlur={() => this.handleDateInputBlur('to')}
                  className={dateRangeInputClasses}
                  value={inputValues.to}
                  icon={
                    <Icon
                      name='date'
                      size={24}
                      onClick={e => this.handleDatePickerIconClick(e, setOnClick)}
                    />
                  }
                  hasError={hasError.to}
                  error={error.to}
                  style={style}
                  {...props}
                />
              </div>
            </div>
          )}
        </Popover>
      ) : (
          <div className={styles.dateRangeInputWrapper}>
            <div>
              <TextInput
                onChange={event => this.handleNativeDateInputChange(event, 'from')}
                onBlur={() => this.handleNativeDateInputBlur('from')}
                className={dateRangeInputClasses}
                value={formatDate(from, VALID_DATE_FORMAT)}
                type='date'
                icon={
                  <Icon
                    name='date'
                    size={24}
                  />
                }
                hasError={hasError.from}
                error={error.from}
                forwardedRef={(ref) => this.setNativeInputRef(ref, 'from')}
                style={style}
                {...props}
              />
            </div>
            <span className={styles.seperator}>
              -
            </span>
            <div>
              <TextInput
                onChange={event => this.handleNativeDateInputChange(event, 'to')}
                onBlur={() => this.handleNativeDateInputBlur('to')}
                className={dateRangeInputClasses}
                value={formatDate(to, VALID_DATE_FORMAT)}
                type='date'
                icon={
                  <Icon
                    name='date'
                    size={24}
                  />
                }
                hasError={hasError.to}
                error={error.to}
                forwardedRef={(ref) => this.setNativeInputRef(ref, 'to')}
                style={style}
                {...props}
              />
            </div>
          </div>
        )
    );
  }
}

DateRangeInput.propTypes = {
  /** Function, will be called when date is selected */
  onDatePickerChange: PropTypes.func.isRequired,
  /** Function, will be called when input value is changed */
  onDateInputChange: PropTypes.func.isRequired,
  /** Instance of Date, date range picker from value */
  from: PropTypes.instanceOf(Date).isRequired,
  /** Instance of Date, date range picker to value */
  to: PropTypes.instanceOf(Date).isRequired,
  /** String, format of date */
  format: PropTypes.oneOf(DATE_FORMATS),
  /** String, className that will be added to input */
  className: PropTypes.string,
  /** String, language of input */
  locale: PropTypes.string,
  /** String, action that is opening date picker */
  trigger: PropTypes.string,
  /** Object, styles that will be passed to input */
  style: PropTypes.object,
};

DateRangeInput.defaultProps = {
  format: DEFAULT_FORMAT,
  className: '',
  locale: DEFAULT_LOCALE,
  trigger: 'click',
  style: {},
};
