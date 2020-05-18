import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './list.css';

export function List({
  className,
  style,
  children,
  maxHeight,
  contentClassName,
  ...props
}) {
  const listClasses = classNames({
    [styles.list]: true,
    [className]: true,
  });

  const contentClasses = classNames({
    [contentClassName]: contentClassName,
    [styles.maxHeight]: maxHeight,
  });

  return (
    <div
      className={listClasses}
      style={style}
      {...props}
    >
      <div
        style={maxHeight ? { maxHeight: `${maxHeight}px` } : {}}
        className={contentClasses}
      >
        {children}
      </div>
    </div>
  );
}

List.propTypes = {
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
  /** Number, max length of list */
  maxHeight: PropTypes.number,
  /** String or JSX or Element, content of List */
  children: PropTypes.any,
  /** String, className that will be added to wrapper div */
  contentClassName: PropTypes.string,
};

List.defaultProps = {
  className: '',
  style: {},
  maxHeight: undefined,
  children: null,
};
