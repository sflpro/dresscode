import React from 'react';
import PropTypes from 'prop-types';

import styles from './error.css';

export function Error({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`${styles.error} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Error.propTypes = {
  /** JSX or Element, child element */
  children: PropTypes.any.isRequired,
  /** String, className that will be passed to wrapper div */
  className: PropTypes.string,
};

Error.defaultProps = {
  className: '',
};
