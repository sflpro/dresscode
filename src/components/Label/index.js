import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './label.css';

export function Label({
  text,
  display,
  hasError,
  disabled,
  isValid,
  className,
  children,
  ...props
}) {
  const labelClasses = classNames({
    [styles.label]: true,
    [className]: true,
    [styles[display]]: true,
    [styles.error]: hasError,
    [styles.successWrapper]: isValid,
    [styles.disabled]: disabled,
  });

  return (
    <label
      className={labelClasses}
      {...props}
    >
      {text && (
        <span className={styles.labelText}>
          {text}
        </span>
      )}
      {children}
    </label>
  );
}

Label.propTypes = {
  /** String, text of label */
  text: PropTypes.string,
  /** String, decides if text is next to input or on top of */
  display: PropTypes.oneOf(['row', 'col']),
  /** Boolean, whether label must be rendered with error styles */
  hasError: PropTypes.bool,
  /** Boolean, whether label must be rendered with disabled styles */
  disabled: PropTypes.bool,
  /** Boolean, whether label must be rendered with success styles */
  isValid: PropTypes.bool,
  /** String, className that will be added to label */
  className: PropTypes.string,
  /** String or JSX or Element, content of label */
  children: PropTypes.any,
};

Label.defaultProps = {
  text: '',
  display: 'row',
  hasError: false,
  disabled: false,
  isValid: false,
  className: '',
  children: null,
};
