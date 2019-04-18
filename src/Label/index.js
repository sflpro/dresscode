import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './label.css';

export function Label({
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
    [styles.success]: isValid,
    [styles.disabled]: disabled,
  });

  return (
    <label
      className={labelClasses}
      {...props}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
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
  /** Object, styles that will be added to label */
  style: PropTypes.string,
  /** String or JSX or Element, content of label */
  children: PropTypes.any,
};

Label.defaultProps = {
  display: 'row',
  hasError: false,
  disabled: false,
  isValid: false,
  className: '',
  style: undefined,
  children: null,
};
