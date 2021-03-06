import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../Form';

export class WithFormFeedback extends React.Component {
  static contextType = FormContext;

  render() {
    const {
      children,
    } = this.props;

    return (
      children(this.context)
    );
  }
}

WithFormFeedback.propTypes = {
  /** JSX or Element, child element */
  children: PropTypes.any.isRequired,
};
