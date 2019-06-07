import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function Body({
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

Body.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** String, className that will be added to table body div */
  className: PropTypes.string,
  /** Object, styles that will be added to table body div */
  style: PropTypes.object,
};

Body.defaultProps = {
  className: '',
  style: undefined,
};
