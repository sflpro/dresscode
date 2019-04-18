import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './dialog.css';

export const Body = ({
  className,
  children,
  ...props
}) => {
  const dialogClasses = classNames({
    [styles.content]: true,
    [className]: true,
  });

  return (
    <div
      className={dialogClasses}
      {...props}
    >
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

Body.propTypes = {
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div  */
  style: PropTypes.object,
  /** String or JSX or Element, content of body */
  children: PropTypes.any,
};

Body.defaultProps = {
  className: '',
  style: undefined,
  children: null,
};
