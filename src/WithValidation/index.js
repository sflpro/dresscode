import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../Form';

export class WithValidation extends React.Component {
  static contextType = FormContext;

  render() {
    const {
      name,
      component: Component,
      ...props
    } = this.props;

    const {
      handleChange,
      handleBlur,
      values,
      errors,
    } = this.context;

    return (
      <Component
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        error={errors[name]}
        hasError={!!errors[name]}
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
};

WithValidation.defaultProps = {};
