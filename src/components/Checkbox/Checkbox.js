import React from 'react';
import PropTypes from 'prop-types';

import { Label } from '../Label/Label';

import styles from './checkbox.css';


export function Checkbox({
  name = '',
  label = '',
  disabled = false,
  checked = false,
  onChange = undefined,
  inputProps = {},
  ...props
}) {
  return (
    <Label>
      <input
        className={styles.checkbox}
        name={name}
        type='checkbox'
        value={label}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...inputProps}
      />
      <span
        className={styles.label}
        {...props}
      >
        {label}
      </span>
    </Label>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};