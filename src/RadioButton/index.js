import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './radioButton.css';

export function RadioButton({
  className,
  disabled,
  checked,
  style,
  ...props
}) {
  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [className]: true,
      })}
      style={style}
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
          checked={checked}
          type='radio'
          {...props}
        />
      </span>
    </div>
  );
}

RadioButton.propTypes = {
  /** Function, called when input value is changed */
  onChange: PropTypes.func,
  /** String, text of label */
  /** String, value of input */
  value: PropTypes.string,
  /** String, text of input */
  name: PropTypes.string,
  /** String, className that is added to wrapper div */
  className: PropTypes.string,
  /** Boolean, weather input is disabled */
  disabled: PropTypes.bool,
  /** Boolean, weather input is checked */
  checked: PropTypes.bool,
  /** Object, style that will be added to wrapper span element */
  style: PropTypes.object,
};

RadioButton.defaultProps = {
  onChange: undefined,
  className: '',
  value: '',
  name: '',
  disabled: false,
  checked: false,
  style: undefined,
};
