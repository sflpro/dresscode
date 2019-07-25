import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../TextInput';

export function TextInputWithPrefix({
  onChange,
  prefix,
  name,
  value,
  ...props
}) {
  function handleChange({ target: { value: nextValue } }) {
    const eventObj = {
      target: {
        name,
        value: `${prefix}${nextValue}`,
      },
    };

    onChange(eventObj);
  }

  let textInputValue = value;
  if (value && value.indexOf(prefix) === 0) {
    textInputValue = value.substr(prefix.length);
  }

  return (
    <React.Fragment>
      <TextInput
        {...props}
        prefix={prefix}
        name={`${name}-withoutPrefix`}
        value={textInputValue}
        onChange={handleChange}
      />
      <input
        type='hidden'
        name={name}
        value={value}
      />
    </React.Fragment>
  );
}

TextInputWithPrefix.propTypes = {
  prefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.isRequired,
};
