import React from 'react';
import PropTypes from 'prop-types';

export function Option({
  data,
  ...props
}) {
  return (
    <option {...props} />
  );
}

Option.propTypes = {
  /** String or Number, value of option */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** String, children of option */
  children: PropTypes.any,
  /** String, className that will be added to option */
  className: PropTypes.string,
  /** Object, style that will be added to option */
  style: PropTypes.any,
  /** Object, data that will be passed to option */
  data: PropTypes.any,
};

Option.defaultProps = {
  value: '',
  children: null,
  className: '',
  style: undefined,
  data: undefined,
};
