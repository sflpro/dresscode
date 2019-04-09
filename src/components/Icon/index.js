import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../polyfills/svgPoyfill';

import styles from './icon.css';
import icons from './svgSprite.svg';

export function Icon({
  name,
  size = 16,
  className = '',
  color,
  style,
  ...props
}) {
  const iconWrapperClasses = classNames({
    [styles.iconWrapper]: true,
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
        <use xlinkHref={`${icons}#${name}`} />
      </svg>
    </span>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
