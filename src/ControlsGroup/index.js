import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './controlsGroup.css';

export function ControlsGroup({
  title,
  className,
  style,
  children,
}) {
  const groupClasses = classNames({
    [className]: true,
    [styles.wrapper]: true,
  });

  return (
    <div>
      {title && (
        <h6 className={styles.title}>
          {title}
        </h6>
      )}
      <div
        className={groupClasses}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

ControlsGroup.propTypes = {
  /** String or JSX or Element, content of group */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  /** String, title of group */
  title: PropTypes.string,
  /** Object, style that will be passed to wrapper div */
  style: PropTypes.any,
  /** String, classname that will be passed to wrapper div */
  className: PropTypes.string,
};

ControlsGroup.defaultProps = {
  title: '',
  style: undefined,
  className: '',
};
