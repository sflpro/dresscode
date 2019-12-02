import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './dialog.css';

export const Header = ({
  className,
  children,
  ...props
}) => {
  const titleClasses = classNames({
    [styles.header]: true,
    [className]: true,
  });

  return (
    <div
      className={titleClasses}
      {...props}
    >
      <h2 className={styles.title}>
        {children}
      </h2>
    </div>
  );
};

Header.propTypes = {
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
  /** String or JSX or Element, content of header */
  children: PropTypes.any,
};

Header.defaultProps = {
  className: '',
  style: undefined,
  children: null,
};
