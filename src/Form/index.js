import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export const FormContext = React.createContext();

export function Form({
  initialErrors: propInitialErrors,
  enableReinitialize,
  validateOnChange,
  validationSchema,
  validateOnMount,
  initialTouched,
  initialValues,
  initialStatus,
  validateOnBlur,
  preventAction,
  forwardedRef,
  component,
  onSubmit,
  validate,
  children,
  onReset,
  formikProps,
  ...props
}) {
  let initialErrors = propInitialErrors;

  if ((!preventAction && validationSchema) && (!initialErrors || Object.keys(initialErrors || {}).length === 0)) {
    try {
      validationSchema.validateSync(initialValues, { abortEarly: false });
    } catch (e) {
      initialErrors = e.inner.reduce((err, current) => {
        [err[current.path]] = current.errors;

        return err;
      }, {});
    }
  }

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      validateOnChange={validateOnChange}
      validationSchema={validationSchema}
      validateOnMount={validateOnMount}
      validateOnBlur={validateOnBlur}
      initialTouched={initialTouched}
      initialErrors={initialErrors}
      initialStatus={initialStatus}
      initialValues={initialValues}
      component={component}
      onSubmit={onSubmit}
      validate={validate}
      onReset={onReset}
      {...formikProps}
    >
      {(formikPropsArg) => {
        const handleFormSubmit = (event) => {
          if ((validationSchema && !formikPropsArg.isValid) || preventAction) {
            return formikPropsArg.handleSubmit(event);
          }

          return formikPropsArg.handleSubmit();
        };

        return (
          <form
            {...props}
            onReset={formikPropsArg.handleReset}
            onSubmit={handleFormSubmit}
            ref={forwardedRef}
          >
            <FormContext.Provider
              value={{ ...formikPropsArg, validationSchema }}
            >
              {children}
            </FormContext.Provider>
          </form>
        );
      }}
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
  /** Boolean, will be passed to Formik, control whether Formik should reset the form if initialValues changes */
  enableReinitialize: PropTypes.bool,
  /** Boolean, whether formik must validate inputs on mount. */
  validateOnMount: PropTypes.bool,
  /** Object, whether inputs are touched. */
  initialTouched: PropTypes.object,
  /** Any, will be passed to Formik, an arbitrary value for the initial status of the form. */
  initialStatus: PropTypes.any,
  /** Function, will be passed to Formik, for reset handler */
  onReset: PropTypes.func,
  /** Any, will be passed to Formik, for custom validation */
  validate: PropTypes.any,
  /** Boolean, will be passed to Formik, use to run validations on blur events. */
  validateOnBlur: PropTypes.bool,
  /** Boolean, will be passed to Formik, use to run validations on change events. */
  validateOnChange: PropTypes.bool,
  /** Function or Yup Scema, A Yup schema or a function that returns a Yup schema. */
  validationSchema: PropTypes.any,
  /** Object, ref which will be passed to form tag */
  forwardedRef: PropTypes.object,
  /** Boolean, pass Event object to Formik handleSubmit function if true */
  preventAction: PropTypes.bool,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
  /** String, form action url */
  action: PropTypes.string,
  /** String, form action method */
  method: PropTypes.string,
  /** Object, initial errors */
  initialErrors: PropTypes.object,
  formikProps: PropTypes.object,
};

Form.defaultProps = {
  component: null,
  enableReinitialize: false,
  validateOnMount: false,
  initialTouched: undefined,
  initialStatus: false,
  onReset: undefined,
  validate: false,
  validateOnBlur: true,
  validateOnChange: true,
  validationSchema: undefined,
  forwardedRef: undefined,
  preventAction: false,
  children: undefined,
  action: undefined,
  method: undefined,
  initialErrors: undefined,
  formikProps: {},
};
