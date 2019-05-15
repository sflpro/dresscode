import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export const FormContext = React.createContext();

export function Form({
  children,
  action,
  ...formProps
}) {
  return (
    <Formik
      {...formProps}
    >
      {(props) => {
        const {
          handleSubmit,
          handleReset,
          ...otherProps
        } = props;

        return (
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            action={action}
          >
            <FormContext.Provider
              value={{
                ...otherProps,
                handleReset,
              }}
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
  onSubmit: PropTypes.func,
  /** Function or Yup Scema, A Yup schema or a function that returns a Yup schema. */
  validationSchema: PropTypes.any,
  /** Function, will be passed to form element */
  handleSubmit: PropTypes.func,
  /** Function, will be passed to form element */
  handleReset: PropTypes.func,
  /** String, form action */
  action: PropTypes.string,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Form.defaultProps = {
  onSubmit: undefined,
  validationSchema: undefined,
  handleSubmit: undefined,
  handleReset: undefined,
  action: undefined,
  children: undefined,
};
