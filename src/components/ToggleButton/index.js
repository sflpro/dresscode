import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Label } from '../Label';

import styles from './toggleButton.css';

export function ToggleButton({
  disabled,
  checked,
  className,
  onChange,
  label,
  name,
  ...props
}) {
  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [className]: true,
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
          type='checkbox'
          name={name}
          {...props}
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
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  disabled: false,
  checked: false,
  className: '',
};
