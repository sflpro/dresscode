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
  /** Function, will be called when toggle value will be changed */
  onChange: PropTypes.func.isRequired,
  /** String, label of toggle button */
  label: PropTypes.string.isRequired,
  /** String, name of toggle button */
  name: PropTypes.string.isRequired,
  /** Boolean, whether toggle is disabled */
  disabled: PropTypes.bool,
  /** Boolean, whether toggle is on */
  checked: PropTypes.bool,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  disabled: false,
  checked: false,
  className: '',
};
