import React from 'react';
import PropTypes from 'prop-types';

import styles from './controlsGroup.css';


export function ControlsGroup({
  title = '',
  children,
  style,
}) {
  return (
    <div>
      {title && (
        <h5 className={styles.title}>
          {title}
        </h5>
      )}
      <div className={styles.wrapper} style={style}>
        {children}
      </div>
    </div>
  );
}

ControlsGroup.propTypes = {
  title: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
};
