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
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableFooter.defaultProps = {
  className: '',
  style: undefined,
};
