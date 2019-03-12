import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Label } from '../Label/Label';

import styles from './toggleButton.css';

export function ToggleButton({
  disabled = false,
  checked = false,
  onChange,
  label,
  name,
}) {
  return (
    <div className={styles.wrapper}>
      <Label
        className={classNames({
          [styles.label]: true,
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        })}
      >
        <input
          className={styles.input}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
          type='checkbox'
          name={name}
        />
        <span>{label}</span>
        <span className={styles.toggle} />
      </Label>
    </div>
  );
}

ToggleButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};
