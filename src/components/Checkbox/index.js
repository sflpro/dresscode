import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from "../Icon";
import { Label } from '../Label';

import styles from './checkbox.css';

export function Checkbox({
  name = '',
  label = '',
  disabled = false,
  checked = false,
  onChange = undefined,
  ...props
}) {
  return (
    <Label>
      <span className={`${styles.iconWrapper} ${checked ? styles.checked : ''} ${disabled ?  styles.disabled : ''}`}>
        <Icon
          name='checked'
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
      <span className={styles.label}>
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