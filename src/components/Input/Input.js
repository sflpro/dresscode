import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '../Label/Label';
import styles from './input.css';


export default function Input({ defaultValue, disabled, label, icon, prefix, isValid, hasError, error, type, ...otherProps }) {
  const id = 'input-id';
  const inputWrapperClasses = classNames({
    [styles.inputWrapper]: true,
    [styles.disabled]: disabled,
    [styles.successWrapper]: isValid,
    [styles.errorWrapper]: hasError,
  });

  return (
    <div className={styles.inputGroup}>
      {label && <Label value={label} htmlFor={id} />}
      <div className={inputWrapperClasses}>
        {prefix && (
          <span className={styles.prefix}>
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={defaultValue}
          disabled={disabled}
          className={styles.input}
          type={type}
          {...otherProps}
        />
        {icon && (
          <span className={styles.inputIcon} />
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

Input.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  prefix: PropTypes.string,
  isValid: PropTypes.bool,
  hasError: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  defaultValue: '',
  disabled: false,
  label: '',
  icon: '',
  prefix: '',
  isValid: false,
  hasError: false,
  error: '',
  type: 'text'
};