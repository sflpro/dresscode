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
  /** String, className that will be added to div that is wrapping content */
  className: PropTypes.string,
  /** Object, styles that will be added to div that is wrapping content */
  style: PropTypes.object,
  /** String or JSX or Element, content of caption */
  children: PropTypes.any,
};

DatePickerCaption.defaultProps = {
  className: '',
  style: {},
  children: null,
};
