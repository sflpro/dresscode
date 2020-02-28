import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './icon.css';

export function Icon({
  name,
  size,
  className,
  color,
  inactive,
  style,
  ...props
}) {
  const iconWrapperClasses = classNames({
    [styles.iconWrapper]: true,
    [styles.inactive]: inactive,
    [className]: true,
  });

  return (
    <span
      className={iconWrapperClasses}
      style={{
        fontSize: `${size}px`,
        color,
        ...style,
      }}
      role='presentation'
      {...props}
    >
      <svg className={styles.icon}>
        <use xlinkHref={`#${name}`} />
      </svg>
    </span>
  );
}

Icon.propTypes = {
  /** String, name of icon from sprite */
  name: PropTypes.string.isRequired,
  /** Number, size of icon in pixels */
  size: PropTypes.number,
  /** String, className that will be added to wrapper span */
  className: PropTypes.string,
  /** String, color of icon */
  color: PropTypes.string,
  /** Boolean, whether icon is inactive */
  inactive: PropTypes.bool,
  /** Object, styles that will be added to wrapper span */
  style: PropTypes.object,
};

Icon.defaultProps = {
  size: 16,
  className: '',
  color: '',
  inactive: false,
  style: {},
};
