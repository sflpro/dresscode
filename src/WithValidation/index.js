import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

import { FormContext } from '../Form';

export class WithValidation extends React.Component {
  handleFieldChange = (event) => {
    const { handleChange } = this.context;
    const { onChange } = this.props;

    handleChange(event);

    if (onChange) {
      onChange(event);
    }
  };

  static contextType = FormContext;

  render() {
    const {
      disabledWhileSubmitting,
      component: Component,
      onChange,
      disabled,
      value,
      name,
      ...props
    } = this.props;

    const {
      isSubmitting,
      handleBlur,
      touched,
      values,
      errors,
    } = this.context;

    const passChecked = ['Checkbox', 'RadioButton'].includes(Component.displayName);

    return (
      <Component
        checked={passChecked ? getIn(values, name) === value : undefined}
        disabled={(disabledWhileSubmitting && isSubmitting) || disabled}
        hasError={!!getIn(errors, name) && !!getIn(touched, name)}
        value={passChecked ? value : getIn(values, name)}
        onChange={this.handleFieldChange}
        onBlur={handleBlur}
        name={name}
        {...props}
      />
    );
  }
}

WithValidation.propTypes = {
  /** String, name which will be passed to child element */
  name: PropTypes.string.isRequired,
  /** JSX or Element, child element */
  component: PropTypes.any.isRequired,
  /** Boolean, if true add disabled property to component while submitting */
  disabledWhileSubmitting: PropTypes.bool,
  /** Boolean, whether component is disabled */
  disabled: PropTypes.bool,
  /** Function, will be called when component value changed */
  onChange: PropTypes.func,
  /** Any, input value (for radio button and checkbox) */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

WithValidation.defaultProps = {
  disabledWhileSubmitting: false,
  disabled: false,
  onChange: undefined,
  value: undefined,
};
