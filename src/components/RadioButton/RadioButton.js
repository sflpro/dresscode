import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Label } from '../Label/Label';

import classes from './radioButton.css';

export function RadioButton({
  isDisabled = false,
  isChecked = false,
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
          [classes.checked]: isChecked,
          [classes.disabled]: isDisabled,
        })}
      >
        <input
          className={classes.input}
          disabled={isDisabled}
          onChange={onChange}
          checked={isChecked}
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
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
};
