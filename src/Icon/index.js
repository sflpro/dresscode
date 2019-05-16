import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { svgPolyfill } from '../polyfills/svgPoyfill';

import styles from './icon.css';
import icons from './svgSprite.svg';

const iconPath = svgPolyfill(document, icons);

export function Icon({
  name,
  size,
  className,
  color,
  style,
  path,
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
        <use xlinkHref={`${path}${iconPath}#${name}`} />
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
  /** Object, styles that will be added to wrapper span */
  style: PropTypes.object,
  /** String, path of icons sprite */
  path: PropTypes.string,
};

Icon.defaultProps = {
  size: 16,
  className: '',
  color: '',
  style: {},
  path: '',
};
