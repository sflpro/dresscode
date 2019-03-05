import React from 'react';
import PropTypes from 'prop-types';

import '../../polyfills/svgPoyfill';

import styles from './icon.css';
import icons from './svgSprite.svg';

export function Icon({
  name,
  className = '',
  ...props
}) {
  return (
    <span
      className={className}
      {...props}
    >
      <svg className={`${styles.icon}`}>
        <use xlinkHref={`${icons}#${name}`} />
      </svg>
    </span>

  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequried,
  className: PropTypes.string,
};
