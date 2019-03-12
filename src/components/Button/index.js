import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './button.css';

export function Button({
  name = '',
  color = 'primary',
  type = 'button',
  hasError = false,
  icon = '',
  iconPos = 'left',
  disabled = false,
  onClick,
  href = '',
  ...props
}) {
  const buttonClasses = classNames({
    [styles[color]]: true,
    [styles[type]]: true,
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
    href ? (
      <a
        href={href}
        className={buttonClasses}
        {...props}
      >
        {children}
      </a>
    ) : (
        <button
          className={buttonClasses}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      )
  );
}

Button.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'neutral',
    'warning',
  ]),
  type: PropTypes.oneOf([
    'button',
    'link',
    'circle',
  ]),
  icon: PropTypes.string,
  iconPos: PropTypes.oneOf([
    'left',
    'right',
  ]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
};