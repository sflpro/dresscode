import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './button.css';

export function Button({
  name = '',
  variant = 'primary',
  sort = 'button',
  type = 'button',
  hasError = false,
  icon = '',
  iconPos = 'left',
  disabled = false,
  as: Component = 'button',
  ...props
}) {
  const buttonClasses = classNames({
    [styles[variant]]: true,
    [styles[sort]]: true,
    [styles.disabled]: disabled,
  });
  const iconClasses = classNames({
    [styles[iconPos]]: true,
  });
  const children = (
    <React.Fragment>
      {icon && iconPos === 'left' && (
        <Icon
          name={icon}
          size={24}
          className={iconClasses}
        />
      )}
      {name}
      {icon && iconPos === 'right' && (
        <Icon
          name={icon}
          size={24}
          className={iconClasses}
        />
      )}
    </React.Fragment>
  );

  return (
    <Component
      className={buttonClasses}
      type={type}
      children={children}
      {...props}
    />
  );
}

Button.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'neutral',
    'warning',
  ]),
  sort: PropTypes.oneOf([
    'button',
    'link',
    'circle',
  ]),
  type: PropTypes.string,
  icon: PropTypes.string,
  iconPos: PropTypes.oneOf([
    'left',
    'right',
  ]),
  disabled: PropTypes.bool,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};