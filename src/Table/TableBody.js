import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function TableBody({
  className,
  children,
  ...props
}) {
  const tableBodyClasses = classNames({
    [styles.tableBody]: true,
    [className]: true,
  });

  return (
    <div
      className={tableBodyClasses}
      {...props}
    >
      {children}
    </div>
  );
}

TableBody.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableBody.defaultProps = {
  className: '',
  style: undefined,
};
