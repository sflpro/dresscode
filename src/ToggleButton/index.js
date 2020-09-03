import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './toggleButton.css';

export function ToggleButton({
  disabled,
  checked,
  className,
  style,
  ...props
}) {
  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });

  return (
    <div
      className={wrapperClasses}
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
          type='checkbox'
          {...props}
        />
        <span className={styles.toggle} />
      </span>
    </div>
  );
}

ToggleButton.displayName = 'ToggleButton';

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
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
};

ToggleButton.defaultProps = {
  onChange: undefined,
  name: '',
  disabled: false,
  checked: false,
  className: '',
  style: undefined,
};
