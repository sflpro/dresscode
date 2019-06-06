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
  options,
  loading,
  value,
  onChange,
  nothingFoundText,
  minCharsToSuggest,
  ...props
}) {
  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });
  const [focused, setFocus] = useState(false);

  function onBlur(event) {
    setFocus(false);

    if (props.onBlur) {
      props.onBlur(event);
    }
  }

  function onFocus(event) {
    setFocus(true);

    if (props.onBlur) {
      props.onBlur(event);
    }
  }

  return (
    <div
      className={wrapperClasses}
      style={style}
    >
      <TextInput
        {...props}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete='off'
      />
      {(focused && value.length >= minCharsToSuggest) && (
        <List
          className={styles.list}
        >
          {loading ? (
            <span className={styles.emptyState}>Loading</span>
          ) : options.length > 0 ? options.map(({ name, value: optionValue }) => (
            <ListItem
              className={styles.listItem}
              value={optionValue}
              key={optionValue}
            >
              {name}
            </ListItem>
          )) : (
            <span className={styles.emptyState}>
              {nothingFoundText}
            </span>
          )}
        </List>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  /** Array, options that will be suggested */
  options: PropTypes.array.isRequired,
  /** String, value of input */
  value: PropTypes.string.isRequired,
  /** Function, called when input value is changed */
  onChange: PropTypes.func.isRequired,
  /** String, text that will be shown if there is no option */
  nothingFoundText: PropTypes.string,
  /** Number, number of chars, after which options will be suggested */
  minCharsToSuggest: PropTypes.number,
  /** String, classname that will be added to select */
  className: PropTypes.string,
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
  /** Boolean, whether to show loading instead of options */
  loading: PropTypes.bool,
  /** Function, called when input is blured */
  onBlur: PropTypes.func,
  /** Function, called when input is focused */
  onFocus: PropTypes.func,
};

Autocomplete.defaultProps = {
  nothingFoundText: 'Nothing found',
  minCharsToSuggest: 3,
  className: undefined,
  style: undefined,
  loading: false,
  onBlur: undefined,
  onFocus: undefined,
};
