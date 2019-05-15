import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function TableHead({
  className,
  children,
  ...props
}) {
  const tableHeadClasses = classNames({
    [styles.tableHead]: true,
    [className]: true,
  });

  return (
    <div
      className={tableHeadClasses}
      {...props}
    >
      {children}
    </div>
  );
}

TableHead.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** String, className that will be added to table head div */
  className: PropTypes.string,
  /** Object, styles that will be added to table head div */
  style: PropTypes.object,
};

TableHead.defaultProps = {
  className: '',
  style: undefined,
};
