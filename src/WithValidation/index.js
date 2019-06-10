import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../Form';

export class WithValidation extends React.Component {
  static contextType = FormContext;

  handleFieldChange = (args) => {
    const {
      handleChange,
      handleBlur,
    } = this.context;

    handleChange({ ...args });
    handleBlur({ ...args });
  };

  render() {
    const {
      name,
      component: Component,
      disabledWhileSubmitting,
      ...props
    } = this.props;

    const {
      handleBlur,
      values,
      errors,
      touched,
      isSubmitting,
    } = this.context;

    return (
      <Component
        name={name}
        onChange={this.handleFieldChange}
        onBlur={handleBlur}
        value={values[name]}
        disabled={disabledWhileSubmitting ? isSubmitting : null}
        hasError={!!errors[name] && !!touched[name]}
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
};

WithValidation.defaultProps = {
  disabledWhileSubmitting: false,
};
