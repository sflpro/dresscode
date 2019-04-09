import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './button.css';

export function Button({
  variant = 'button',
  type = 'button',
  as: Component = 'button',
  disabled = false,
  primary = true,
  secondary = false,
  neutral = false,
  warning = false,
  className = '',
  style,
  children,
  ...props
}) {
  const buttonClasses = classNames({
    [className]: true,
    [styles[variant]]: true,
    [styles.primary]: primary && !(secondary || neutral || warning),
    [styles.secondary]: secondary,
    [styles.neutral]: neutral,
    [styles.warning]: warning,
    [styles.disabled]: disabled,
  });
  return (
    <Component
      className={buttonClasses}
      type={type}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf([
    'button',
    'link',
    'circle',
  ]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  neutral: PropTypes.bool,
  warning: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
