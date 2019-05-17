import React from 'react';
import PropTypes from 'prop-types';

import styles from './error.css';

export function Error({
  children,
  ...props
}) {
  return (
    <div
      className={styles.error}
      {...props}
    >
      {children}
    </div>
  );
}

Error.propTypes = {
  /** JSX or Element, child element */
  children: PropTypes.any.isRequired,
};
