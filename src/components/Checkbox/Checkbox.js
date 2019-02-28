import React from 'react';
import checkbox from './checkbox.css';
import PropTypes from 'prop-types';

export function Checkbox({id, name, label, disabled, checked, onChange}) {
    return (
        <div>
            <input
                className={checkbox.checkbox}
                id={id}
                name={name || id}
                type="checkbox"
                value={label}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
            />
            <label className={checkbox.label} htmlFor={id}> {label} </label>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name:  PropTypes.string,
    disabled: PropTypes.bool,
    checked:  PropTypes.bool,
};

Checkbox.defaultProps = {
    checked: false,
    disabled: false,
    name: '',
};