import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './textInput.css';

export function TextInput({
  value,
  placeholder,
  disabled,
  readOnly,
  className,
  icon,
  prefix,
  isValid,
  hasError,
  error,
  type,
  name,
  onChange,
  style,
  forwardedRef,
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
      <div className={inputWrapperClasses} style={style}>
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
          ref={forwardedRef}
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
  /** String, value of textarea */
  value: PropTypes.string,
  /** Boolean, whether textarea is disabled */
  disabled: PropTypes.bool,
  /** Boolean, whether input is readOnly */
  readOnly: PropTypes.bool,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
  /** String, JSX or Element, icon that will be shown on input */
  icon: PropTypes.any,
  /** String, string that will be added at start of input */
  prefix: PropTypes.string,
  /** Boolean, whether value of textarea is valid */
  isValid: PropTypes.bool,
  /** Boolean, whether value of textarea has error */
  hasError: PropTypes.bool,
  /** String, error message that will be shown if textarea has error */
  error: PropTypes.string,
  /** String, type of input */
  type: PropTypes.string,
  /** String, placeholder of input */
  placeholder: PropTypes.string,
  /** String, name of input */
  name: PropTypes.string,
  /** Function, will be called when input value will be changed */
  onChange: PropTypes.func,
  /** Function, will add ref to input */
  forwardedRef: PropTypes.func,
};

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  className: '',
  icon: null,
  prefix: '',
  isValid: false,
  hasError: false,
  error: '',
  type: 'text',
  name: '',
  onChange: undefined,
  style: {},
  forwardedRef: undefined,
};
