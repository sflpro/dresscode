import React, { useState } from 'react';
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
  ...props
}) {
  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });

  const [loading, toggleLoading] = useState(false);
  const [focused, toggleFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(propsValue);

  function filter(option) {
    return option.toLowerCase().includes(value.toLowerCase());
  }

  function onListClick(optionValue) {
    toggleFocus(false);
    setValue(optionValue);

    props.onChange({
      currentTarget: {
        value: optionValue,
        name: props.name,
      },
      target: {
        value: optionValue,
        name: props.name,
      },
    });
  }

  function onFocus(event) {
    toggleFocus(true);

    if (props.onBlur) {
      props.onBlur(event);
    }
  }

  function onChange({ currentTarget: { value: onChangeValue } }) {
    let promiseIsResolved = false;
    setValue(onChangeValue);

    if (onChangeValue.length < minCharsToSuggest) {
      if (options.length > 0) {
        setOptions([]);
      }
      return;
    }

    setTimeout(() => {
      if (!promiseIsResolved) {
        toggleLoading(true);
      }
    }, showLoadingAfter);
    const result = getOptions(onChangeValue);

    if (Array.isArray(result)) {
      setOptions(result.filter(filter));
    } else {
      result.then((promiseResult) => {
        if (loading) {
          toggleLoading(true);
        }

        promiseIsResolved = true;
        setOptions(promiseResult.filter(filter));
        toggleLoading(false);
      });
    }
  }

  function handleOverlayClick() {
    toggleFocus(false);
  }

  return (
    <div
      className={wrapperClasses}
      style={style}
    >
      <TextInput
        {...props}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        autoComplete='off'
        className={styles.input}
        icon={<Icon name='tracker' color={loading ? '' : 'transparent'} />}
      />
      {(focused && value.length >= minCharsToSuggest && !loading) && (
        <>
          <List
            className={styles.list}
          >
            {options.length > 0 ? options.map(option => (
              <ListItem
                onClick={() => onListClick(option)}
                className={styles.listItem}
                value={option}
                key={option}
              >
                {option}
              </ListItem>
            )) : (
              <div className={styles.emptyState}>
                {nothingFoundText}
              </div>
            )}
          </List>
          <div
            onClick={handleOverlayClick}
            className={styles.overlay}
            role='presentation'
          />
        </>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  /** Function, will return options array or promise that will resolve to options array */
  getOptions: PropTypes.func.isRequired,
  /** String, value of input */
  value: PropTypes.string.isRequired,
  /** Function, called when input value is changed */
  onChange: PropTypes.func.isRequired,
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
  /** String, name of input */
  name: PropTypes.string,
  /** String, will be shown if there is no option */
  nothingFoundText: PropTypes.string,
  /** Number, after what time after sending request loading must be shown if promise is not resolved */
  showLoadingAfter: PropTypes.number,
};

Autocomplete.defaultProps = {
  nothingFoundText: 'Nothing found',
  minCharsToSuggest: 3,
  className: undefined,
  style: undefined,
  onBlur: undefined,
  onFocus: undefined,
  name: '',
  showLoadingAfter: 100,
};
