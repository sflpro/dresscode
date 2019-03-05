import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './listItem.css';

export function ListItem({
  value = '',
  label = '',
  icon = '',
  iconPos = 'right',
  disabled = false,
  active = false,
  iconClassName = '',
  onClick,
  children,
  ...props
}) {
  const listItemClasses = classNames({
    [styles.listItem]: true,
    [styles.disabled]: disabled,
    [styles.active]: active,
  });
  const listItemIconClasses = classNames({
    [iconClassName]: true,
    [styles.icon]: true,
  });
  console.log(iconClassName);
  console.log(listItemIconClasses);
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
        <Icon
          name={icon}
          className={listItemIconClasses}
        />
      )}
      {label}
      {iconPos === 'right' && (
        <Icon
          name={icon}
          className={listItemIconClasses}
        />
      )}
    </div>
  );
}

ListItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  iconPos: PropTypes.oneOf(['left', 'right']),
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.object,
};