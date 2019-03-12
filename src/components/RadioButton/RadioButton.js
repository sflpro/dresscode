import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Label } from '../Label/Label';

import classes from './radioButton.css';

export function RadioButton({
  disabled = false,
  checked = false,
  onChange,
  value,
  label,
  name,
}) {
  return (
    <div className={classes.wrapper}>
      <Label
        className={classNames({
          [classes.label]: true,
          [classes.checked]: checked,
          [classes.disabled]: disabled,
        })}
      >
        <input
          className={classes.input}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
          value={value}
          type='radio'
          name={name}
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
