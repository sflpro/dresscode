import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../Form';

export class WithFormFeedback extends React.Component {
  static contextType = FormContext;

  render() {
    const {
      children,
    } = this.props;

    const {
      dirty,
      isSubmitting,
      isValid,
      isValidating,
      touched,
      errors,
      handleSubmit,
      handleReset,
      status,
      values,
    } = this.context;

    return (
      children({
        dirty,
        isSubmitting,
        isValid,
        isValidating,
        touched,
        errors,
        handleSubmit,
        handleReset,
        status,
        values,
      })
    );
  }
}

WithFormFeedback.propTypes = {
  /** JSX or Element, child element */
  children: PropTypes.any.isRequired,
};
