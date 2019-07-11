import React from 'react';
import PropTypes from 'prop-types';

import styles from './table.css';

export const Footer = ({
  className,
  children,
  ...props
}) => (
  <div
    className={`${styles.tableFooter} ${className}`}
    {...props}
  >
    <div className={styles.tableFooterOverlay} />
    {children}
  </div>
);

Footer.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** String, className that will be added to table head div */
  className: PropTypes.string,
  /** Object, styles that will be added to table head div */
  style: PropTypes.object,
};

Footer.defaultProps = {
  className: '',
  style: undefined,
};
