import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './colorScheme.css';

export function ColorScheme({
  text = '',
  bgColor = '',
  secondaryBgColor = '',
  borderColor = '',
  textColor = '',
  className = '',
  ...props
}) {
  const colorSchemeClasses = classNames({
    [className]: true,
    [styles.colorScheme]: true,
  });

  let style = {
    border: `1px solid ${borderColor}`,
    color: textColor,
  };

  if(secondaryBgColor) {
    style.background = `linear-gradient(248deg, ${secondaryBgColor}, ${bgColor})`
  } else {
    style.backgroundColor = bgColor;
  }

  return (
    <div
      className={colorSchemeClasses}
      style={style}
      {...props}
    >
      <div className={styles.textColor}>
        <div>
          {bgColor}
          {secondaryBgColor ? <span className={styles.secondaryColor}>{secondaryBgColor}</span> : ""}
        </div>
      </div>
      <div className={styles.textType}>
        {text}
      </div>
    </div>
  );
}

ColorScheme.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};
