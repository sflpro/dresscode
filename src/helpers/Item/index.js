import React from 'react';
import PropTypes from 'prop-types';

import styles from './item.css';

export function Item({
  children,
  style,
  ...props
}) {
  return (
    <div
      className={styles.item}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

Item.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

Item.defaultProps = {
  style: undefined,
};
