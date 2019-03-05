import React from 'react';
import PropTypes from 'prop-types';

import styles from './label.css';

export function Label({
  value = '',
  className,
  children,
  ...props
}) {
  return (
    <label
      className={className || styles.label}
      {...props}
    >
      {value && (
        <span>
          {value}
        </span>
      )}
      {children}
    </label>
  );
}

Label.propTypes = {
  value: PropTypes.string,
  children: PropTypes.any,
};