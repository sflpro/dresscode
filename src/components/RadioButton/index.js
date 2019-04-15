import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './radioButton.css';

export function RadioButton({
  className,
  disabled,
  checked,
  onChange,
  value,
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
      <span
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
          value={value}
          type='radio'
          name={name}
          {...props}
        />
      </span>
    </div>
  );
}

RadioButton.propTypes = {
  /** Function, called when input value is changed */
  onChange: PropTypes.func.isRequired,
  /** String, value of input */
  value: PropTypes.string.isRequired,
  /** String, text of input */
  name: PropTypes.string.isRequired,
  /** String, className that is added to wrapper div */
  className: PropTypes.string,
  /** Boolean, weather input is disabled */
  disabled: PropTypes.bool,
  /** Boolean, weather input is checked */
  checked: PropTypes.bool,
};

RadioButton.defaultProps = {
  className: '',
  disabled: false,
  checked: false,
};
