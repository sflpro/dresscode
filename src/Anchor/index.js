import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './anchor.css';

export function Anchor({
  href,
  className,
  target,
  style,
  onClick,
  children,
  ...props
}) {
  const anchorClasses = classNames({
    [styles.anchor]: true,
    [className]: true,
  });
  return (
    <a
      href={href}
      className={anchorClasses}
      target={target}
      rel='noopener noreferrer'
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}

Anchor.propTypes = {
  /** String, location that will be moved after click */
  href: PropTypes.string.isRequired,
  /** String, className that will be added to anchor */
  className: PropTypes.string,
  /** String, target of anchor */
  target: PropTypes.string,
  /** Object, styles that will be added to anchor */
  style: PropTypes.object,
  /** Function, function that will be called after anchor click */
  onClick: PropTypes.func,
  /** String or JSX or Element, content of anchor element */
  children: PropTypes.any,
};

Anchor.defaultProps = {
  className: '',
  target: '_blank',
  style: {},
  onClick: undefined,
  children: null,
};
