import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function TableHead({
  className,
  style,
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
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

TableHead.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableHead.defaultProps = {
  className: '',
  style: undefined,
};
