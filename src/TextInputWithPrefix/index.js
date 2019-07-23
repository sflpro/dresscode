import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../TextInput';

export class TextInputWithPrefix extends React.Component {
  handleChange = ({ target: { value } }) => {
    const {
      prefix,
      name,
      onChange,
    } = this.props;

    const eventObj = {
      target: {
        name,
        value: `${prefix}${value}`,
      },
    };

    onChange(eventObj);
  };

  render() {
    const {
      prefix,
      name,
      value,
      ...props
    } = this.props;

    let textInputValue = value;
    if (value && value.indexOf(prefix) === 0) {
      textInputValue = value.substr(prefix.length);
    }
    return (
      <React.Fragment>
        <TextInput
          {...props}
          component={TextInput}
          prefix={prefix}
          name={`${name}-withoutPrefix`}
          value={textInputValue}
          onChange={this.handleChange}
        />
        <input
          type='hidden'
          name={name}
          value={value}
        />
      </React.Fragment>
    );
  }
}

TextInputWithPrefix.propTypes = {
  prefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.isRequired,
};
