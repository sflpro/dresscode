import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './textInput.css';

export function TextInput({
  value = '',
  placeholder = '',
  disabled = false,
  readOnly = false,
  className = '',
  label = '',
  icon = null,
  prefix = '',
  isValid = false,
  hasError = false,
  error = '',
  type = 'text',
  name = '',
  onChange = undefined,
  children,
  ...props
}) {
  const inputWrapperClasses = classNames({
    [styles.inputWrapper]: true,
    [className]: true,
    [styles.disabled]: disabled,
    [styles.successWrapper]: isValid,
    [styles.errorWrapper]: hasError,
  });

  return (
    <React.Fragment>
      <div className={inputWrapperClasses}>
        {prefix && (
          <span className={styles.prefix}>
            {prefix}
          </span>
        )}
        <input
          value={value}
          disabled={disabled}
          className={styles.input}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          type={type}
          readOnly={readOnly}
          {...props}
        />
        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}
      </div>
      {hasError && error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </React.Fragment>
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.any,
  prefix: PropTypes.string,
  isValid: PropTypes.bool,
  hasError: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.any,
};