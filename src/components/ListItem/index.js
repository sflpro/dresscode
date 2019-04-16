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
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick({ value, event });
      }}
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
  /** String, text of list item */
  label: PropTypes.string,
  /** String, value that will be passed to onClick handler */
  value: PropTypes.string,
  /** String, name of icon of list item */
  icon: PropTypes.string,
  /** String, position of icon related to text, left - before text, right - after text */
  iconPos: PropTypes.oneOf(['left', 'right']),
  /** String, className that will be added to icon */
  iconClassName: PropTypes.string,
  /** Function, will be called when list item clicked and get object with keys value and event as argument */
  onClick: PropTypes.func,
  /** Object, styles that will be added to icon */
  iconStyle: PropTypes.object,
  /** Boolean, whether list item render as disabled and onClick handler must not be called */
  disabled: PropTypes.bool,
  /** Boolean, whether list item render as active */
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
};
