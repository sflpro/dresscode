import React from 'react';
import PropTypes from 'prop-types';

import styles from './label.css';

export function Label({
  text = '',
  className,
  children,
  ...props
}) {
  return (
    <label
      className={className || styles.label}
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
  children: PropTypes.any,
};