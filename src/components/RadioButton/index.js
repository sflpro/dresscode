import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Label } from '../Label';

import styles from './radioButton.css';

export function RadioButton({
  disabled = false,
  checked = false,
  onChange,
  value,
  label,
  name,
  ...props
}) {
  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [props.className || '']: true
      })}
    >
      <Label
        className={classNames({
          [styles.label]: true,
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        })}
        display='col'
      >
        <input
          className={styles.input}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
          value={value}
          type='radio'
          name={name}
          {...props}
        />
        {label}
      </Label>
    </div>
  );
}

RadioButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};
