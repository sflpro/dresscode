import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './picker.css';

export function Picker({
  captionElement,
  navbarElement,
  className,
  children,
  ...props
}) {
  const pickerClasses = classNames({
    [styles.picker]: true,
    [className]: true,
  });
  return (
    <div
      className={pickerClasses}
      {...props}
    >
      {navbarElement}
      <div className={styles.pickerContainer}>
        {captionElement}
        <div className={styles.pickerBody}>
          {children}
        </div>
      </div>
    </div>
  );
}

Picker.propTypes = {
  /** String or JSX or Element, caption of picker element */
  captionElement: PropTypes.any.isRequired,
  /** String or JSX or Element, navbar of picker element */
  navbarElement: PropTypes.any.isRequired,
  /** String or JSX or Element, content of picker element */
  children: PropTypes.any.isRequired,
  /** Object, styles that will be added to month picker */
  style: PropTypes.object,
  /** String, className that will be added to month picker */
  className: PropTypes.string,
};

Picker.defaultProps = {
  className: '',
  style: undefined,
};
