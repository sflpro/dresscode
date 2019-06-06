import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../Form';

export class WithValidation extends React.Component {
  static contextType = FormContext;

  render() {
    const {
      name,
      component: Component,
      disabledWhileSubmitting,
      ...props
    } = this.props;

    const {
      handleChange,
      handleBlur,
      values,
      errors,
      touched,
      isSubmitting,
    } = this.context;

    return (
      <Component
        name={name}
        onChange={handleChange}
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
