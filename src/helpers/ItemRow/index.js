import React from 'react';
import PropTypes from 'prop-types';

import styles from './itemRow.css';

export function ItemRow({
  children,
  style,
  ...props
}) {
  return (
    <div
      className={styles.itemRow}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

ItemRow.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

ItemRow.defaultProps = {
  style: undefined,
};
