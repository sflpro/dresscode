import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './datePickerCaption.css';

export function DatePickerCaption({
  className = '',
  style = null,
  children,
  ...props
}) {
  const captionWrapperClasses = classNames({
    [styles.captionWrapper]: true,
    [className]: true,
  });

  return (
    <div className={styles.caption}>
      <div
        className={captionWrapperClasses}
        role='presentation'
        style={style}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

DatePickerCaption.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
