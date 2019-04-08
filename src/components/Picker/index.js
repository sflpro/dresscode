import React from 'react';
import PropTypes from 'prop-types';

import styles from './picker.css';

export function Picker({
  captionElement,
  navbarElement,
  style,
  children,
  ...props
}) {
  return (
    <div
      className={styles.picker}
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
  style: PropTypes.object,
  children: PropTypes.any,
};
