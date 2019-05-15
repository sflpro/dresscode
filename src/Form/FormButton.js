import React from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '.';
import { Button } from '../Button';

export function FormButton({
  disabled,
  children,
  ...props
}) {
  const contextType = FormContext;
  return (
    <Button
      {...props}
      disabled={contextType.isSubmitting || disabled}
    >
      {children}
    </Button>
  );
}

FormButton.propTypes = {
  /** Boolean, indicating whether the element should render as disabled */
  disabled: PropTypes.bool,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

FormButton.defaultProps = {
  disabled: false,
  children: null,
};
