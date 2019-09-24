import React from 'react';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';

import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { Label } from '../Label';
import { DateRangePicker } from '../DateRangePicker';
import {
  DATE_FORMATS,
  VALID_DATE_FORMAT,
  DEFAULT_FORMAT,
  DEFAULT_LOCALE,
} from '../DatePicker/constants';
import {
  convertStringToDate,
  isValidDate,
} from '../DatePicker/helpers';
import { TextInput } from '../TextInput';
import { isMobile } from '../utils';

import styles from './dateRangeInput.css';

export class DateRangeInput extends React.Component {
  constructor(props) {
    super(props);

    const { from, to, format } = this.props;
    this.state = {
      open: false,
      currentValues: {
        from: from && isValidDate(from, format) ? convertStringToDate(from, format) : undefined,
        to: to && isValidDate(to, format) ? convertStringToDate(to, format) : undefined,
      },
    };

    this.focused = {
      from: false,
      to: false,
    };
  }

  getRangeUpdatedValues = ({ picker, value }) => {
    const { from, to, format } = this.props;
    const rangeValues = {};

    if (picker === 'from') {
      if (to && convertStringToDate(to, format) < value) {
        rangeValues.to = formatDate(value, format);
      }
    } else if (from && convertStringToDate(from, format) > value) {
      rangeValues.from = formatDate(value, format);
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
    const { onChange, format } = this.props;
    const { to, from } = date;

    if (to) {
      this.setState(prevState => ({
        open: false,
        currentValues: {
          ...prevState.currentValues,
          to,
        },
      }));
      date.to = formatDate(to, format);
    } else {
      date.from = formatDate(from, format);
      date.to = '';

      this.setState(prevState => ({
        currentValues: {
          ...prevState.currentValues,
          from,
          to: undefined,
        },
      }));
    }
    onChange(date);
  };

  handleDateInputBlur = (selectedPicker) => {
    const { from, to, onChange, hasError, format } = this.props;

    let selectedPickerValue;
    if (selectedPicker === 'from') {
      selectedPickerValue = from;
    } else {
      selectedPickerValue = to;
    }

    this.focused[selectedPicker] = false;

    if (!hasError[selectedPicker]) {
      const date = convertStringToDate(selectedPickerValue, format);
      const formatedValue = formatDate(date, format);

      onChange({
        [selectedPicker]: formatedValue,
      });
    }
  };

  handleDateInputFocus = event => (
    event.target.select()
  );

  handleDateInputChange = (event, selectedPicker) => {
    const { onChange, format, from, to } = this.props;
    const { value } = event.target;

    this.focused[selectedPicker] = true;

    let passivePickerValue;
    if (selectedPicker === 'from') {
      passivePickerValue = to;
    } else {
      passivePickerValue = from;
    }

    if (isValidDate(value, format) && isValidDate(passivePickerValue, format)) {
      const formatedDate = convertStringToDate(value, format);
      const rangeValues = this.getRangeUpdatedValues({
        picker: selectedPicker,
        value: formatedDate,
      });
      rangeValues[selectedPicker] = value;
      onChange(rangeValues);
    } else {
      onChange({
        [selectedPicker]: value,
      });
    }
  };

  handleNativeDateInputChange = (event, selectedPicker) => {
    const { onChange, format } = this.props;
    const { value } = event.target;
    if (value) {
      const formatedDate = formatDate(new Date(value), format);

      const rangeValues = this.getRangeUpdatedValues({
        picker: selectedPicker,
        value: new Date(value),
      });

      rangeValues[selectedPicker] = formatedDate;
      onChange(rangeValues);
    }
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
      name,
      onChange,
      from,
      to,
      format,
      className = '',
      inputClassName = '',
      separatorClassName = '',
      locale,
      trigger,
      style,
      hasError,
      separator,
      label,
      ...props
    } = this.props;
    const { open, currentValues } = this.state;

    const isNativeMode = isMobile();
    const inputValues = {
      from: from && isValidDate(from, format) ? convertStringToDate(from, format) : currentValues.from,
      to: to && isValidDate(to, format) ? convertStringToDate(to, format) : currentValues.to,
    };

    return (
      !isNativeMode ? (
        <Popover
          trigger={trigger}
          content={(
            <DateRangePicker
              onChange={this.handleDateRangePickerChange}
              numberOfMonths={2}
              from={inputValues.from}
              to={inputValues.to}
              locale={locale}
            />
          )}
          onTargetEvent={this.handleTargetEvent}
          open={open}
          gap={8}
          contentRelative
        >
          {({ setOnClick }) => (
            <div className={`${styles.dateRangeInputWrapper} ${className}`}>
              <Label>
                {label.from}
                <TextInput
                  name={name.from}
                  onChange={event => this.handleDateInputChange(event, 'from')}
                  onFocus={event => this.handleDateInputFocus(event, 'from')}
                  onBlur={() => this.handleDateInputBlur('from')}
                  className={inputClassName}
                  value={from}
                  icon={(
                    <Icon
                      name='date'
                      size={24}
                      onClick={e => this.handleDatePickerIconClick(e, setOnClick)}
                    />
                  )}
                  hasError={hasError.from}
                  {...props}
                />
              </Label>
              <span className={`${styles.seperator} ${separatorClassName}`}>
                {separator}
              </span>
              <Label>
                {label.to}
                <TextInput
                  name={name.to}
                  onChange={event => this.handleDateInputChange(event, 'to')}
                  onFocus={event => this.handleDateInputFocus(event, 'to')}
                  onBlur={() => this.handleDateInputBlur('to')}
                  className={inputClassName}
                  value={to}
                  icon={(
                    <Icon
                      name='date'
                      size={24}
                      onClick={e => this.handleDatePickerIconClick(e, setOnClick)}
                    />
                  )}
                  hasError={hasError.to}
                  {...props}
                />
              </Label>
            </div>
          )}
        </Popover>
      ) : (
        <div className={`${styles.dateRangeInputWrapper} ${className}`}>
          <Label>
            {label.from}
            <TextInput
              name={`native-${name.from || ''}`}
              onChange={event => this.handleNativeDateInputChange(event, 'from')}
              onBlur={() => this.handleNativeDateInputBlur('from')}
              className={inputClassName}
              value={!hasError.from && inputValues.from ? formatDate(inputValues.from, VALID_DATE_FORMAT) : ''}
              type='date'
              icon={(
                <Icon
                  name='date'
                  size={24}
                />
              )}
              hasError={hasError.from}
              forwardedRef={ref => this.setNativeInputRef(ref, 'from')}
              {...props}
            />
          </Label>
          <span className={`${styles.seperator} ${separatorClassName}`}>
            {separator}
          </span>
          <Label>
            {label.to}
            <TextInput
              name={`native-${name.to || ''}`}
              onChange={event => this.handleNativeDateInputChange(event, 'to')}
              onBlur={() => this.handleNativeDateInputBlur('to')}
              className={inputClassName}
              value={!hasError.to && inputValues.to ? formatDate(inputValues.to, VALID_DATE_FORMAT) : ''}
              type='date'
              icon={(
                <Icon
                  name='date'
                  size={24}
                />
              )}
              hasError={hasError.to}
              forwardedRef={ref => this.setNativeInputRef(ref, 'to')}
              {...props}
            />
          </Label>
        </div>
      )
    );
  }
}

DateRangeInput.propTypes = {
  /** Function, will be called when date is selected */
  onChange: PropTypes.func.isRequired,
  /** String, date range picker from value */
  from: PropTypes.string.isRequired,
  /** String, date range picker to value */
  to: PropTypes.string.isRequired,
  /** Object, names of range date input elements */
  name: PropTypes.object,
  /** Object, labels of range date input elements */
  label: PropTypes.object,
  /** Object, whether  date range picker inputs must be rendered with error styles */
  hasError: PropTypes.object,
  /** String, separator element */
  separator: PropTypes.any,
  /** String, format of date */
  format: PropTypes.oneOf(DATE_FORMATS),
  /** String, className that will be added to input wrapper */
  className: PropTypes.string,
  /** String, className that will be added to input */
  inputClassName: PropTypes.string,
  /** String, className that will be added to separator */
  separatorClassName: PropTypes.string,
  /** String, language of input */
  locale: PropTypes.string,
  /** String, action that is opening date picker */
  trigger: PropTypes.string,
  /** Object, styles that will be passed to input */
  style: PropTypes.object,
};

DateRangeInput.defaultProps = {
  format: DEFAULT_FORMAT,
  locale: DEFAULT_LOCALE,
  trigger: 'click',
  separator: '',
  className: '',
  inputClassName: '',
  separatorClassName: '',
  style: undefined,
  hasError: {
    from: false,
    to: false,
  },
  name: {
    from: 'from',
    to: 'to',
  },
  label: {
    from: '',
    to: '',
  },
};
