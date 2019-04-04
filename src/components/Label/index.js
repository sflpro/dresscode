import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './label.css';

export function Label({
  text = '',
  hasError = false,
  display = 'row',
  className = '',
  children,
  ...props
}) {
  const labelClasses = classNames({
    [styles.label]: true,
    [className]: true,
    [styles[display]]: true,
    [styles.error]: hasError,
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
  text: PropTypes.string,
  display: PropTypes.oneOf(['row', 'col']),
  hasError: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
};