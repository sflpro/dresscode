import React from 'react';
import PropTypes from 'prop-types';

import styles from './item.css';

export function Item({
  children,
  ...props
}) {
  return (
    <div
      className={styles.item}
      {...props}
    >
      {children}
    </div>
  );
}

Item.propTypes = {
  children: PropTypes.any,
};