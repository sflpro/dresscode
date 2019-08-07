import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

import { FormContext } from '../Form';

export class WithErrorFeedback extends React.Component {
  static contextType = FormContext;

  render() {
    const {
      name,
      children,
    } = this.props;

    const {
      errors,
      touched,
      values,
    } = this.context;

    return (
      children({
        error: getIn(errors, name),
        touched: getIn(touched, name),
        value: getIn(values, name),
      })
    );
  }
}

WithErrorFeedback.propTypes = {
  /** String, name which will be passed to child element */
  name: PropTypes.string.isRequired,
  /** JSX or Element, child element */
  children: PropTypes.any.isRequired,
};
