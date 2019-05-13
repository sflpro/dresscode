import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function TableFooter({
  className,
  children,
  ...props
}) {
  const tableFooterClasses = classNames({
    [styles.tableFooter]: true,
    [className]: true,
  });

  return (
    <div
      className={tableFooterClasses}
      {...props}
    >
      <div className={styles.tableFooterOverlay} />
      {children}
    </div>
  );
}

TableFooter.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** String, className that will be added to table head div */
  className: PropTypes.string,
  /** Object, styles that will be added to table head div */
  style: PropTypes.object,
};

TableFooter.defaultProps = {
  className: '',
  style: undefined,
};
