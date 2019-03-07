import React from 'react';
import PropTypes from 'prop-types';

import styles from './list.css';

export function List({
  className,
  style,
  children,
  ...props
}) {
  return (
    <div
      className={className || styles.list}
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