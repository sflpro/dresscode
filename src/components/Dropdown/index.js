import React from 'react';
import PropTypes from 'prop-types';

import styles from './dropdown.css';

export function Dropdown({
  children = '',
  ...props
}) {
  return (
    <div
      className={styles.dropdown}
      {...props}
    >
      {children}
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.any,
};