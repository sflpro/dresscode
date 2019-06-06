import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './icon.css';
import icons from './svgSprite.svg';

let alreadySet = false;

export function Icon({
  name,
  size,
  className,
  color,
  style,
  ...props
}) {
  const iconWrapperClasses = classNames({
    [styles.iconWrapper]: true,
    [className]: true,
  });

  let svgIcons = '';

  if (!alreadySet) {
    alreadySet = true;

    svgIcons = <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: icons }} />;
  }

  return (
    <>
      {svgIcons}
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
    </>
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
};

Icon.defaultProps = {
  size: 16,
  className: '',
  color: '',
  style: {},
};
