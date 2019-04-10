import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './list.css';

export function List({
  className,
  style,
  children,
  ...props
}) {
  const listClasses = classNames({
    [styles.list]: true,
    [className]: true,
  });
  return (
    <div
      className={listClasses}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

List.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
