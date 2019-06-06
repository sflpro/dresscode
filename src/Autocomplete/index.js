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
  nothingFoundElement,
  minCharsToSuggest,
  ...props
}) {
  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });

  const [focused, setFocus] = useState(false);

  function onListClick(optionValue) {
    setFocus(false);

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
        onFocus={onFocus}
        autoComplete='off'
      />
      {(focused && value.length >= minCharsToSuggest) && (
        <List
          className={styles.list}
        >
          {loading || (
            options.length > 0 ? options.map(option => (
              <ListItem
                onClick={() => onListClick(option)}
                className={styles.listItem}
                value={option}
                key={option}
              >
                {option}
              </ListItem>
            )) : nothingFoundElement
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
  /** JSX or component, will be shown if there is no option */
  nothingFoundElement: PropTypes.any,
  /** Number, number of chars, after which options will be suggested */
  minCharsToSuggest: PropTypes.number,
  /** String, classname that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
  /** JSX or component, to show loading instead of options */
  loading: PropTypes.any,
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
  loading: null,
  onBlur: undefined,
  onFocus: undefined,
  name: '',
};
