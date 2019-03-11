import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './toggleButton.css';

export function ToggleButton({ name, label, isChecked, isDisabled, handleChange }) {
  return (
    <div className={styles.wrapper}>
      <label
        className={classNames({
          [styles.label]: true,
          [styles.checked]: isChecked,
          [styles.disabled]: isDisabled,
        })}
      >
        <input
          className={styles.input}
          onChange={handleChange}
          disabled={isDisabled}
          checked={isChecked}
          type='checkbox'
          name={name}
        />
        <span>{label}</span>
        <span className={styles.toggle} />
      </label>
    </div>
  );
}

ToggleButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
};

ToggleButton.defaultProps = {
  isDisabled: false,
  isChecked: false,
};
