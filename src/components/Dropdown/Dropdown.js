import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Label/Label';
import { isMobile } from '../../utils/utils';
import styles from './dropdown.css';


function NativeDropdown({ props }) {
  return (
    <select
      id={id}
      value={defaultValue}
      disabled={disabled}
      className={styles.input}
      type={type}
      {...otherProps}
    />
  );
}

function CustomDropdown({ props }) {
  return (
    <div>
      custom
    </div>
  );
}


export function Dropdown({ defaultValue, disabled, label, isValid, hasError, error, ...otherProps }) {
  const id = 'dropdown-id';

  const nativeDropdown = isMobile();

  return (
    <div className={styles.dropdownGroup}>
      <Label value={label} >

      </Label>
      <div>
        {nativeDropdown ? (
          <NativeDropdown />
        ) : (
            <CustomDropdown />
          )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

Dropdown.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  isValid: PropTypes.bool,
  hasError: PropTypes.bool,
  error: PropTypes.string,
};

Dropdown.defaultProps = {
  defaultValue: '',
  disabled: false,
  label: '',
  isValid: false,
  hasError: false,
  error: '',
};