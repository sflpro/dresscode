import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';

import { FormContext } from '../Form';

export class FormArrayField extends React.Component {
  static contextType = FormContext;

  render() {
    const {
      children,
      name,
    } = this.props;

    const {
      touched,
      errors,
      setFieldValue,
      values,
    } = this.context;

    return (
      <FieldArray
        name={name}
      >
        {arrayHelpers => children({
          arrayHelpers,
          touched,
          errors,
          values,
          setFieldValue,
        })}
      </FieldArray>
    );
  }
}

FormArrayField.propTypes = {
  /** String, name of formArray */
  name: PropTypes.string.isRequired,
  /** Function, will get arrayHelpers, touched, errors, values and setFieldValue */
  children: PropTypes.func.isRequired,
};
