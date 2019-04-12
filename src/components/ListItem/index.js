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
  iconStyle = {},
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
    [styles.clickable]: onClick,
  });
  const listItemIconClasses = classNames({
    [iconClassName]: true,
  });

  return (
    <div
      onClick={event => onClick({ value, event })}
      className={listItemClasses}
      role='presentation'
      {...props}
    >
      {icon && iconPos === 'left' && (
        <Icon
          name={icon}
          className={listItemIconClasses}
          size={24}
        />
      )}
      <span>{label}</span>
      {icon && iconPos === 'right' && (
        <Icon
          className={listItemIconClasses}
          style={iconStyle}
          name={icon}
          size={24}
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
  iconStyle: PropTypes.object,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

ListItem.defaultProps = {
  value: '',
  label: '',
  icon: '',
  iconPos: 'right',
  iconStyle: {},
  disabled: false,
  active: false,
  iconClassName: '',
  onClick: undefined,
  children: null,
};
