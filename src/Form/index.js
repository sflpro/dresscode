import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export const FormContext = React.createContext();

export function Form({
  component,
  render,
  enableReinitialize,
  isInitialValid,
  initialStatus,
  initialValues,
  onReset,
  onSubmit,
  validate,
  validateOnBlur,
  validateOnChange,
  validationSchema,
  children,
  ...props
}) {
  return (
    <Formik
      component={component}
      render={render}
      enableReinitialize={enableReinitialize}
      isInitialValid={isInitialValid}
      initialStatus={initialStatus}
      initialValues={initialValues}
      onReset={onReset}
      onSubmit={onSubmit}
      validate={validate}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <form
          {...props}
          onSubmit={formikProps.handleSubmit}
          onReset={formikProps.handleReset}
        >
          <FormContext.Provider
            value={formikProps}
          >
            {children}
          </FormContext.Provider>
        </form>
      )}
    </Formik>
  );
}

Form.propTypes = {
  /** Object, form fileds initial values */
  initialValues: PropTypes.object.isRequired,
  /** Function, will be passed to Formik and will be called when form submitted */
  onSubmit: PropTypes.func.isRequired,
  /** JSX or Element, will be passed to Formik */
  component: PropTypes.any,
  /** Function, will be passed to Formik */
  render: PropTypes.func,
  /** Boolean, will be passed to Formik, control whether Formik should reset the form if initialValues changes */
  enableReinitialize: PropTypes.bool,
  /** Boolean, will be passed to Formik, control the initial value of isValid prop prior to mount. */
  isInitialValid: PropTypes.bool,
  /** Any, will be passed to Formik, an arbitrary value for the initial status of the form. */
  initialStatus: PropTypes.any,
  /** Function, will be passed to Formik, for reset handler */
  onReset: PropTypes.func,
  /** Any, will be passed to Formik, for custom validation */
  validate: PropTypes.any,
  /** Function, will be passed to Formik, use to run validations on blur events. */
  validateOnBlur: PropTypes.bool,
  /** Function, will be passed to Formik, use to run validations on change events. */
  validateOnChange: PropTypes.bool,
  /** Function or Yup Scema, A Yup schema or a function that returns a Yup schema. */
  validationSchema: PropTypes.any,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Form.defaultProps = {
  component: null,
  render: null,
  enableReinitialize: false,
  isInitialValid: false,
  initialStatus: false,
  onReset: undefined,
  validate: false,
  validateOnBlur: true,
  validateOnChange: true,
  validationSchema: undefined,
  children: undefined,
};
