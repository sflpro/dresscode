import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './dialog.css';

export const Body = ({
  className = '',
  children,
  ...props
}) => {
  const dialogClasses = classNames({
    [styles.content]: true,
    [className]: true,
  });

  return (
    <div className={dialogClasses} {...props}>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
