import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './area.css';

export function Area({
  direction,
  fit,
  fixed,
  cover,
  className,
  children,
  ...props
}) {
  const areaClassNames = classNames({
    [className]: true,
    [styles.area]: true,
    [styles[direction]]: true,
    [styles.fixed]: fixed,
    [styles.cover]: cover,
    [styles.fit]: fit,
  });

  return (
    <div
      className={areaClassNames}
      {...props}
    >
      {children}
    </div>
  );
}

Area.propTypes = {
  /** String, defining the direction of elements are placed in the area component */
  direction: PropTypes.oneOf([
    'vertical',
    'horizontal',
  ]),
  /** Boolean, the area should stretch to fit the child if true */
  fit: PropTypes.bool,
  /** Boolean, the area height should be equal to container height if true */
  fixed: PropTypes.bool,
  /** Boolean, the area height should be not less then container height if true */
  cover: PropTypes.bool,
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, style that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Area.defaultProps = {
  direction: 'horizontal',
  fit: false,
  fixed: false,
  cover: false,
  className: '',
  style: undefined,
  children: null,
};
