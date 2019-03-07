import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Label } from '../Label';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { Icon } from '../Icon';
import { isMobile } from '../../utils';

import styles from './select.css';

export function Select({
  value = '',
  label = '',
  name = '',
  open = false,
  onClick,
  onChange,
  children,
  ...props
}) {
  const options = React.Children.map(children, option =>
    React.cloneElement(<ListItem />, {
      value: option.props.value,
      label: option.props.name,
      onClick: onChange,
      active: option.props.value === value,
    })
  );

  const isNativeMode = isMobile();
  const nativeSelectClasses = classNames({
    [styles.select]: true,
    [styles.nativeSelect]: !isNativeMode,
    [styles.nativeCustomSelect]: isNativeMode,
  });
  const selectClasses = classNames({
    [styles.select]: true,
    [styles.active]: open,
  });
  const iconClasses = classNames({
    [styles.icon]: true,
    [styles.reverseIcon]: open,
  });
  const nativeIconClasses = classNames({
    [styles.icon]: true,
    [styles.nativeIcon]: true,
  });

  return (
    <Label
      text={label}
    >
      <div className={styles.nativeSelectWrapper}>
        <select
          value={value}
          name={name}
          className={nativeSelectClasses}
          onChange={onChange}
          {...props}
        >
          {children}
        </select>
        {isNativeMode && (
          <Icon
            name='arrow-down'
            className={nativeIconClasses}
          />
        )}
      </div>
      {!isNativeMode && (
        <div>
          <div
            className={selectClasses}
            onClick={() => onClick({
              currentTarget: {
                value,
              }
            })}
            {...props}
          >
            {value}
            <Icon
              name='arrow-down'
              className={iconClasses}
            />
          </div>
          {open && (
            <List>
              {options}
            </List>
          )}
        </div>
      )}
    </Label>
  );
}

Select.propTypes = {
  value: PropTypes.string,
  open: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
};