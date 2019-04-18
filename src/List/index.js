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
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
  /** String or JSX or Element, content of List */
  children: PropTypes.any,
};

List.defaultProps = {
  className: '',
  style: undefined,
  children: null,
};
