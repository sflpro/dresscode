import React from 'react';
import PropTypes from 'prop-types';

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
        error: errors[name],
        touched: touched[name],
        value: values[name],
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
