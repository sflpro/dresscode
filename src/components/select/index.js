import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Label } from '../label';
import { ListItem } from '../listItem';
import { Dropdown } from '../dropdown';
import { List } from '../list';
import { isMobile } from '../../utils';

import styles from './select.css';

export function Select({
  value = '',
  label = '',
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

  return (
    <Label
      text={label}
    >
      <select
        value={value}
        className={nativeSelectClasses}
        onChange={onChange}
        {...props}
      >
        {children}
      </select>
      {!isNativeMode && (
        <List>
          <div className={selectClasses}>
            <ListItem
              label={value}
              value={value}
              onClick={onClick}
            />
          </div>
          {open && (
            <Dropdown>
              {options}
            </Dropdown>
          )}
        </List>
      )}
    </Label>
  );
}

Select.propTypes = {
  value: PropTypes.string,
  open: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
};