import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Label } from '../Label';

import styles from './textarea.css';

export function Textarea({
  value,
  placeholder,
  disabled,
  className,
  label,
  rows,
  cols,
  isValid,
  hasError,
  error,
  name,
  onChange,
  children,
  ...props
}) {
  const textareaClasses = classNames({
    [styles.textarea]: true,
    [className]: true,
    [styles.disabled]: disabled,
    [styles.successWrapper]: isValid,
    [styles.errorWrapper]: hasError,
  });

  return (
    <Label
      text={label}
      hasError={hasError}
    >
      <textarea
        rows={rows}
        cols={cols}
        value={value}
        disabled={disabled}
        className={textareaClasses}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        {...props}
      />
      {hasError && error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </Label>
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  isValid: PropTypes.bool,
  hasError: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.any,
};

Textarea.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  className: '',
  label: '',
  rows: '3',
  cols: '40',
  isValid: false,
  hasError: false,
  error: '',
  name: '',
  onChange: undefined,
  children: null,
};
