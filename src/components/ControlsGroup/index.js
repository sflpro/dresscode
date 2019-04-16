import React from 'react';
import PropTypes from 'prop-types';

import styles from './controlsGroup.css';

export function ControlsGroup({
  title,
  style,
  children,
}) {
  return (
    <div>
      {title && (
        <h6 className={styles.title}>
          {title}
        </h6>
      )}
      <div className={styles.wrapper} style={style}>
        {children}
      </div>
    </div>
  );
}

ControlsGroup.propTypes = {
  /** String, title of group */
  title: PropTypes.string,
  /** Object, style that will be passed to wrapper div */
  style: PropTypes.any,
  /** String or JSX or Element, content of group */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

ControlsGroup.defaultProps = {
  title: '',
  style: {},
};
