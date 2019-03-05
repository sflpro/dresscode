import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './listItem.css';

export function ListItem({
  value = '',
  label = '',
  icon = '',
  iconPos = 'right',
  disabled = false,
  active = false,
  iconClassName,
  onClick,
  children,
  ...props
}) {
  const listItemClasses = classNames({
    [styles.listItem]: true,
    [styles.disabled]: disabled,
    [styles.active]: active,
  });

  return (
    <div
      className={listItemClasses}
      onClick={() => onClick({
          currentTarget: {
            value
          }
      })}
      {...props}
    >
      {iconPos === 'left' && (
        <span className={iconClassName || styles.icon}>
          {icon}
        </span>
      )}
      {label}
      {iconPos === 'right' && (
        <span className={iconClassName || styles.icon}>
          {icon}
        </span>
      )}
    </div>
  );
}

ListItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  iconPos: PropTypes.oneOf(['left', 'right']),
  iconClassName: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.object,
};