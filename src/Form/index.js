import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export const FormContext = React.createContext();

export function Form({
  component,
  render,
  enableReinitialize,
  isInitialValid: propIsInitialValid,
  initialStatus,
  initialValues,
  onReset,
  onSubmit,
  validate,
  validateOnBlur,
  validateOnChange,
  validationSchema,
  forwardedRef,
  preventAction,
  children,
  ...props
}) {
  const [isInitialValidIsSet, setIsInitialValidIsSet] = useState(propIsInitialValid);
  const [isInitialValid, setIsInitialValid] = useState(propIsInitialValid);

  useEffect(() => {
    if (validationSchema && props.action && props.method && !propIsInitialValid) {
      try {
        validationSchema.validateSync(initialValues);
        setIsInitialValid(true);
      } catch (error) {
        setIsInitialValid(false);
      }
    }

    setIsInitialValidIsSet(true);
  }, []);

  if (!isInitialValidIsSet) {
    return null;
  }

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
      {(formikProps) => {
        const handleFormSubmit = (event) => {
          if ((validationSchema && !formikProps.isValid) || preventAction) {
            return formikProps.handleSubmit(event);
          }
          return formikProps.handleSubmit();
        };

        return (
          <form
            {...props}
            onSubmit={handleFormSubmit}
            onReset={formikProps.handleReset}
            ref={forwardedRef}
          >
            <FormContext.Provider
              value={formikProps}
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
  forwardedRef: undefined,
  preventAction: false,
  children: undefined,
  action: undefined,
  method: undefined,
};
