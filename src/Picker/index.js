import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './picker.css';

export function Picker({
  captionElement,
  navbarElement,
  className,
  style,
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
      style={style}
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
  captionElement: PropTypes.any,
  navbarElement: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

Picker.defaultProps = {
  captionElement: null,
  navbarElement: null,
  className: '',
  style: undefined,
  children: null,
};
