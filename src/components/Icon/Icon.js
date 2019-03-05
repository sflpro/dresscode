import React from 'react';
import PropTypes from 'prop-types';
import '../../polyfills/svgPoyfill';

import styles from './icon.css';
import icons from './svgSprite.svg';

export function Icon({
  name,
  className = ''
}) {
  return (
    <svg className={`${styles.icon} ${className}`}>
      <use xlinkHref={`${icons}#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequried,
};
