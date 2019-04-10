import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './dialog.css';

export const Actions = ({
  className = '',
  children,
  ...props
}) => {
  const actionClasses = classNames({
    [styles.actions]: true,
    [className]: true,
  });
  return (
    <div className={actionClasses} {...props}>
      {children}
    </div>
  );
};

Actions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
