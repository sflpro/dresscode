import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Label } from '../Label/Label';

import styles from './toggleButton.css';

export function ToggleButton({
  isDisabled,
  isChecked,
  onChange,
  label,
  name,
}) {
  return (
    <div className={styles.wrapper}>
      <Label
        className={classNames({
          [styles.label]: true,
          [styles.checked]: isChecked,
          [styles.disabled]: isDisabled,
        })}
      >
        <input
          className={styles.input}
          disabled={isDisabled}
          onChange={onChange}
          checked={isChecked}
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
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
};

ToggleButton.defaultProps = {
  isDisabled: false,
  isChecked: false,
};
