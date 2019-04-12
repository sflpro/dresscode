import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { Label } from '../Label';

import styles from './checkbox.css';

export function Checkbox({
  onChange,
  label,
  name,
  disabled,
  checked,
  ...props
}) {
  const checkboxClasses = classNames({
    [styles.iconWrapper]: true,
    [styles.checked]: checked,
    [styles.disabled]: disabled,
  });
  const labelClasses = classNames({
    [styles.label]: true,
    [styles.disabledLabel]: disabled,
  });

  return (
    <Label
      display='col'
    >
      <span className={checkboxClasses}>
        <Icon
          name='checked'
          size={12}
          className={styles.icon}
        />
      </span>
      <input
        className={styles.checkbox}
        name={name}
        type='checkbox'
        value={label}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={labelClasses}>
        {label}
      </span>
    </Label>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  name: '',
  disabled: false,
  checked: false,
};
