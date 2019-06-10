import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextInput } from '../TextInput';
import { ListItem } from '../ListItem';
import { List } from '../List';

import styles from './autocomplete.css';

export function Autocomplete({
  className,
  style,
  getOptions,
  loadingIcon,
  value: propsValue,
  nothingFoundElement,
  minCharsToSuggest,
  loading,
  ...props
}) {
  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });

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
    setValue(onChangeValue);

    if (onChangeValue.length < minCharsToSuggest) {
      if (options.length > 0) {
        setOptions([]);
      }
      return;
    }

    const result = getOptions(onChangeValue);

    if (Array.isArray(result)) {
      setOptions(result.filter(filter));
    } else {
      result.then(promiseResult => setOptions(promiseResult.filter(filter)));
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
        icon={loadingIcon}
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
            )) : nothingFoundElement}
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
  /** JSX or component, will be shown if there is no option */
  nothingFoundElement: PropTypes.any,
  /** Number, number of chars, after which options will be suggested */
  minCharsToSuggest: PropTypes.number,
  /** Boolean, whether must show loading icon */
  loading: PropTypes.bool,
  /** String, classname that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
  /** JSX or component, to show loading instead of options */
  loadingIcon: PropTypes.any,
  /** Function, called when input is blured */
  onBlur: PropTypes.func,
  /** Function, called when input is focused */
  onFocus: PropTypes.func,
  /** String, name of input */
  name: PropTypes.string,
};

Autocomplete.defaultProps = {
  nothingFoundElement: null,
  minCharsToSuggest: 3,
  className: undefined,
  style: undefined,
  loadingIcon: null,
  loading: false,
  onBlur: undefined,
  onFocus: undefined,
  name: '',
};
