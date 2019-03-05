import React from 'react';
import PropTypes from 'prop-types';

import styles from './list.css';

export function List({
  children,
  ...props
}) {
  return (
    <div
      className={styles.list}
      {...props}
    >
      {children}
    </div>
  );
}

List.propTypes = {
  children: PropTypes.any,
};