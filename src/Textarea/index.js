import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './textarea.css';

export function Textarea({
  disabled,
  className,
  isValid,
  hasError,
  error,
  name,
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
    <React.Fragment>
      <textarea
        disabled={disabled}
        className={textareaClasses}
        name={name}
        {...props}
      />
      {hasError && error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </React.Fragment>
  );
}

Textarea.propTypes = {
  /** String, value of textarea */
  value: PropTypes.string,
  /** Boolean, whether textarea is disabled */
  disabled: PropTypes.bool,
  /** Number, rows of textarea */
  rows: PropTypes.number,
  /** Number, cols of textarea */
  cols: PropTypes.number,
  /** Boolean, whether value of textarea is valid */
  isValid: PropTypes.bool,
  /** Boolean, whether value of textarea has error */
  hasError: PropTypes.bool,
  /** String, error message that will be shown if textarea has error */
  error: PropTypes.string,
  /** String, placeholder of textarea */
  placeholder: PropTypes.string,
  /** String, name of textarea */
  name: PropTypes.string,
  /** String, className that will be added to textarea */
  className: PropTypes.string,
  /** Function, will be called when value of textarea will be changed */
  onChange: PropTypes.func,
  /** Object, style that will be added to textarea */
  style: PropTypes.object,
};

Textarea.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  className: '',
  rows: 3,
  cols: 40,
  isValid: false,
  hasError: false,
  error: '',
  name: '',
  onChange: undefined,
  style: undefined,
};
