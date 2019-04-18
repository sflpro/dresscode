import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './button.css';

export function Button({
  variant,
  type,
  as: Component,
  disabled,
  primary,
  secondary,
  neutral,
  warning,
  className,
  style,
  children,
  onClick,
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
      disabled={disabled}
      {...props}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </Component>
  );
}

Button.propTypes = {
  /** String, decide how button will be represented, can be 'button', 'link' or 'circle' */
  variant: PropTypes.oneOf([
    'button',
    'link',
    'circle',
  ]),
  /** String, type of button */
  type: PropTypes.string,
  /** String or function, valid html element or React component that will be used to create this element */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Boolean, indicating whether the element should render as disabled */
  disabled: PropTypes.bool,
  /** Boolean, indicating whether the element should render with primary color */
  primary: PropTypes.bool,
  /** Boolean, indicating whether the element should render with secondary color */
  secondary: PropTypes.bool,
  /** Boolean, indicating whether the element should render with neutral color */
  neutral: PropTypes.bool,
  /** Boolean, indicating whether the element should render with warning color */
  warning: PropTypes.bool,
  /** Function, will be called when element is clicked */
  onClick: PropTypes.func,
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, styles that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Button.defaultProps = {
  variant: 'button',
  type: 'button',
  as: 'button',
  disabled: false,
  primary: true,
  secondary: false,
  neutral: false,
  warning: false,
  onClick: undefined,
  className: '',
  style: {},
  children: null,
};

export function LinkButton(props) {
  return (
    <Button
      {...props}
      variant='link'
    />
  );
}

export function CircleButton(props) {
  return (
    <Button
      {...props}
      variant='circle'
    />
  );
}
