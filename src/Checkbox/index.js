import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './checkbox.css';

export function Checkbox({
  hasError,
  disabled,
  checked,
  className,
  style,
  ...props
}) {
  const checkboxClasses = classNames({
    [className]: true,
    [styles.iconWrapper]: true,
    [styles.checked]: checked,
    [styles.disabled]: disabled,
  });

  return (
    <React.Fragment>
      <span
        className={checkboxClasses}
        style={style}
      >
        <Icon
          className={styles.icon}
          name='checked'
          size={12}
        />
        <input
          className={styles.checkbox}
          disabled={disabled}
          checked={checked}
          type='checkbox'
          {...props}
        />
      </span>
    </React.Fragment>
  );
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /** Function, will be called when checkbox value changed */
  onChange: PropTypes.func,
  /** String, name of checkbox */
  name: PropTypes.string,
  /** Boolean, describe whether checkbox is disabled */
  disabled: PropTypes.bool,
  /** Boolean, describe whether checkbox is checked */
  checked: PropTypes.bool,
  /** String, classname that will be passed to wrapper span element */
  className: PropTypes.string,
  /** Object, style that will be added to wrapper span element */
  style: PropTypes.bool,
  /** Boolean, whether value of checkbox has error */
  hasError: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: undefined,
  name: '',
  disabled: false,
  checked: false,
  className: '',
  style: undefined,
  hasError: false,
};
