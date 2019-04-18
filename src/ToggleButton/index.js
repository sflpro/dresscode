import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './toggleButton.css';

export function ToggleButton({
  disabled,
  checked,
  className,
  onChange,
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
          type='checkbox'
          name={name}
          {...props}
        />
        <span className={styles.toggle} />
      </span>
    </div>
  );
}

ToggleButton.propTypes = {
  /** Function, will be called when toggle value will be changed */
  onChange: PropTypes.func,
  /** String, name of toggle button */
  name: PropTypes.string,
  /** Boolean, whether toggle is disabled */
  disabled: PropTypes.bool,
  /** Boolean, whether toggle is on */
  checked: PropTypes.bool,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  onChange: undefined,
  name: '',
  disabled: false,
  checked: false,
  className: '',
};
