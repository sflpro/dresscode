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
  preventAction,
  iconSize,
  ...props
}) {
  const checkboxClasses = classNames({
    [className]: true,
    [styles.iconWrapper]: true,
    [styles.checked]: checked,
    [styles.disabled]: disabled,
  });

  return (
    <>
      <span
        onClick={!preventAction ? e => e.currentTarget.lastChild.click() : undefined}
        className={checkboxClasses}
        role='presentation'
        style={style}
      >
        <Icon
          className={styles.icon}
          size={iconSize}
          name='checked'
        />
        <input
          className={styles.checkbox}
          disabled={disabled}
          checked={checked}
          type='checkbox'
          {...props}
        />
      </span>
    </>
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
  style: PropTypes.object,
  /** Boolean, whether value of checkbox has error */
  hasError: PropTypes.bool,
  /** Boolean, whether prevent onClick */
  preventAction: PropTypes.bool,
  /** String, that will be passed to checkbox checked icon size */
  iconSize: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: undefined,
  name: '',
  disabled: false,
  checked: false,
  className: '',
  style: undefined,
  hasError: false,
  preventAction: true,
  iconSize: 12,
};
