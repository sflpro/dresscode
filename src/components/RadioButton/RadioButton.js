import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './radioButton.css';

export function RadioButton({ name, value, id, label, isChecked, isDisabled, handleChange }) {
  return (
    <div className={classes.wrapper}>
      <input
        className={classes.input}
        onChange={handleChange}
        disabled={isDisabled}
        checked={isChecked}
        value={value}
        type='radio'
        name={name}
        id={id}
      />
      <label
        className={classNames({
          [classes.label]: true,
          [classes.checked]: isChecked,
          [classes.disabled]: isDisabled,
        })}
        htmlFor={id}
      >
        <span>{label}</span>
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
};

RadioButton.defaultProps = {
  isDisabled: false,
  isChecked: false,
};
