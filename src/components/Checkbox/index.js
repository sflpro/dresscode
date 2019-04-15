import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './checkbox.css';

export function Checkbox({
  onChange,
  value,
  name,
  disabled,
  checked,
  ...props
}) {
  const checkboxClasses = classNames({
    [styles.iconWrapper]: true,
    [styles.checked]: checked,
    [styles.disabled]: disabled,
  });

  return (
    <React.Fragment>
      <span className={checkboxClasses}>
        <Icon
          name='checked'
          size={12}
          className={styles.icon}
        />
        <input
          className={styles.checkbox}
          name={name}
          type='checkbox'
          value={value}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...props}
        />
      </span>
    </React.Fragment>
  );
}

Checkbox.propTypes = {
  /** Function, will be called when checkbox value changed */
  onChange: PropTypes.func.isRequired,
  /** String, value of checkbox */
  value: PropTypes.string.isRequired,
  /** String, name of checkbox */
  name: PropTypes.string,
  /** Boolean, describe whether checkbox is disabled */
  disabled: PropTypes.bool,
  /** Boolean, describe whether checkbox is checked */
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  name: '',
  disabled: false,
  checked: false,
};
