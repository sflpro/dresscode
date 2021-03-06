import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './textInput.css';

export function TextInput({
  disabled,
  className,
  prefixClassName,
  icon,
  prefix,
  isValid,
  hasError,
  style,
  forwardedRef,
  type,
  ...props
}) {
  const inputWrapperClasses = classNames({
    [styles.inputWrapper]: true,
    [styles.disabled]: disabled,
    [styles.successWrapper]: isValid,
    [styles.errorWrapper]: hasError,
    [styles.hidden]: type === 'hidden',
    [className]: true,
  });

  const inputPrefixClasses = classNames({
    [styles.prefix]: true,
    [prefixClassName]: prefixClassName,
  });
  return (
    <div
      className={inputWrapperClasses}
      style={style}
    >
      {prefix && (
        <span className={inputPrefixClasses}>
          {prefix}
        </span>
      )}
      <input
        disabled={disabled}
        className={styles.input}
        ref={forwardedRef}
        type={type}
        {...props}
      />
      {icon && (
        <div className={styles.icon}>
          {icon}
        </div>
      )}
    </div>
  );
}

TextInput.propTypes = {
  /** String, value of text input */
  value: PropTypes.string,
  /** Boolean, whether text input is disabled */
  disabled: PropTypes.bool,
  /** Boolean, whether input is readOnly */
  readOnly: PropTypes.bool,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** String, className that will be added to prefix div */
  prefixClassName: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
  /** String, JSX or Element, icon that will be shown on input */
  icon: PropTypes.any,
  /** Any, element that will be added at start of input */
  prefix: PropTypes.any,
  /** Boolean, whether value of text input is valid */
  isValid: PropTypes.bool,
  /** Boolean, whether value of text input has error */
  hasError: PropTypes.bool,
  /** String, type of input */
  type: PropTypes.string,
  /** String, placeholder of input */
  placeholder: PropTypes.string,
  /** String, name of input */
  name: PropTypes.string,
  /** Function, will be called when input value will be changed */
  onChange: PropTypes.func,
  /** Function, will add ref to input */
  forwardedRef: PropTypes.any,
};

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  className: '',
  prefixClassName: '',
  icon: null,
  prefix: null,
  isValid: false,
  hasError: false,
  type: 'text',
  name: '',
  onChange: undefined,
  style: undefined,
  forwardedRef: undefined,
};
