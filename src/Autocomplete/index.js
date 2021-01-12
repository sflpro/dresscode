import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextInput } from '../TextInput';
import { ListItem } from '../ListItem';
import { List } from '../List';
import { Icon } from '../Icon';

import styles from './autocomplete.css';

export function Autocomplete({
  className,
  style,
  getOptions,
  value: propsValue,
  minCharsToSuggest,
  nothingFoundText,
  showLoadingAfter,
  selectedOptionValue,
  onBlur,
  onFocus,
  hasError,
  errorHint,
  haveArrowIcon,
  onChange,
  renderOption,
  renderValue,
  ...props
}) {
  const [loading, toggleLoading] = useState(false);
  const [value, setValue] = useState(propsValue);
  const [focused, toggleFocus] = useState(false);
  const [options, setOptions] = useState([]);

  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });

  useEffect(() => {
    setValue(propsValue || '');
  }, [propsValue]);

  function onLostFocus() {
    toggleFocus(false);

    if (onBlur) {
      onBlur({
        currentTarget: {
          name: props.name,
          value,
        },
        target: {
          name: props.name,
          value,
        },
      });
    }
  }

  function onListClick(option, { event }) {
    event.preventDefault();
    onLostFocus();

    onChange({
      currentTarget: {
        value: option.value,
        name: props.name,
        option,
      },
      target: {
        value: option.value,
        name: props.name,
        option,
      },
    });
  }

  function handleOptionChange(inputValue, callback) {
    let promiseIsResolved = false;

    if (inputValue.length < minCharsToSuggest) {
      if (options.length > 0) {
        setOptions([]);
      }

      if (callback && typeof callback === 'function') {
        callback();
      }
      return;
    }

    const result = getOptions(inputValue);

    if (Array.isArray(result)) {
      setOptions(result);

      if (callback && typeof callback === 'function') {
        callback();
      }
    } else {
      setTimeout(() => {
        if (!promiseIsResolved) {
          toggleLoading(true);
        }
      }, showLoadingAfter);

      result.then((promiseResult) => {
        promiseIsResolved = true;
        setOptions(promiseResult);
        toggleLoading(false);

        if (callback && typeof callback === 'function') {
          callback();
        }
      });
    }
  }

  function handleChange({ currentTarget: { value: onChangeValue } }) {
    setValue(onChangeValue);
    onChange({
      currentTarget: {
        value: onChangeValue,
        name: props.name,
      },
      target: {
        value: onChangeValue,
        name: props.name,
      },
    });

    handleOptionChange(onChangeValue);
  }

  function handleFocus(event) {
    handleOptionChange(renderValue(value), () => {
      toggleFocus(true);
    });

    if (onFocus) {
      onFocus(event);
    }
  }

  function handleOverlayClick(event) {
    event.preventDefault();
    onLostFocus();
  }

  const arrowOnClick = !loading && focused ? handleOverlayClick : handleFocus;
  const arrowIcon = loading
    ? 'tracker'
    : focused
      ? 'arrow-up'
      : 'arrow-down';

  return (
    <div
      className={wrapperClasses}
      style={style}
    >
      <TextInput
        {...props}
        value={renderValue(value)}
        onChange={handleChange}
        onFocus={handleFocus}
        hasError={hasError}
        autoComplete='off'
        className={styles.input}
        icon={
          haveArrowIcon ? (
            <Icon
              onClick={arrowOnClick}
              name={arrowIcon}
              color='black'
              size={24}
            />
          ) : (
            <Icon
              color={loading ? '' : 'transparent'}
              name='tracker'
            />
          )
        }
      />
      {hasError && errorHint && (
        <div className={styles.errorWrapper}>
          {errorHint}
        </div>
      )}
      {(focused && value.length >= minCharsToSuggest && !loading) && (
        <List
          className={styles.list}
          maxHeight={350}
        >
          {options.length > 0 ? options.map(option => (
            <ListItem
              onClick={event => onListClick(option, event)}
              active={selectedOptionValue === option.value}
              className={styles.listItem}
              value={option.value}
              key={option.value}
            >
              {renderOption(option)}
            </ListItem>
          )) : (
            <div className={styles.emptyState}>
              {nothingFoundText}
            </div>
          )}
        </List>
      )}
      {focused && (
        <div
          onClick={handleOverlayClick}
          className={styles.overlay}
          role='presentation'
        />
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  /** Function, will return options array or promise that will resolve to options array */
  getOptions: PropTypes.func.isRequired,
  /** Function, called when input value is changed */
  onChange: PropTypes.func.isRequired,
  /** String, value of input */
  value: PropTypes.string,
  /** Number, number of chars, after which options will be suggested */
  minCharsToSuggest: PropTypes.number,
  /** String, classname that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
  /** Function, called when input is blured */
  onBlur: PropTypes.func,
  /** Function, called when input is focused */
  onFocus: PropTypes.func,
  /** Boolean, whether value of autocomplete input has error */
  hasError: PropTypes.bool,
  /** String, errorHint of input */
  errorHint: PropTypes.string,
  /** String, name of input */
  name: PropTypes.string,
  /** String, will be shown if there is no option */
  nothingFoundText: PropTypes.string,
  /** Number, after what time after sending request loading must be shown if promise is not resolved */
  showLoadingAfter: PropTypes.number,
  /** Boolean, whether input must dropdown icon */
  haveArrowIcon: PropTypes.bool,
  /** Function, template to render option */
  renderOption: PropTypes.func,
  /** Function, template to render selected value */
  renderValue: PropTypes.func,
  /** String, value of selected option */
  selectedOptionValue: PropTypes.string,
};

Autocomplete.defaultProps = {
  nothingFoundText: 'Nothing found',
  minCharsToSuggest: 3,
  className: undefined,
  style: undefined,
  onBlur: undefined,
  onFocus: undefined,
  hasError: false,
  errorHint: '',
  name: '',
  showLoadingAfter: 100,
  value: '',
  haveArrowIcon: false,
  selectedOptionValue: '',
  renderOption: option => option.label,
  renderValue: value => value,
};
