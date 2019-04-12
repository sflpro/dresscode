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
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

Anchor.defaultProps = {
  className: '',
  target: '_blank',
  style: {},
  onClick: undefined,
  children: null,
};
