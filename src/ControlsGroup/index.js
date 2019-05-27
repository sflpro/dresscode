import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './controlsGroup.css';

export function ControlsGroup({
  title,
  className,
  titleClassName,
  style,
  children,
  ...props
}) {
  const groupClasses = classNames({
    [className]: true,
    [styles.wrapper]: true,
  });

  const titleClasses = classNames({
    [titleClassName]: true,
    [styles.wrapper]: true,
  });

  return (
    <div {...props}>
      {title && (
        <h6 className={titleClasses}>
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
  /** String, classname that will be passed to title */
  titleClassName: PropTypes.string,
};

ControlsGroup.defaultProps = {
  title: '',
  style: undefined,
  className: '',
  titleClassName: '',
};
