import React from 'react';
import PropTypes from 'prop-types';

export function Option({
  data,
  contentClassName,
  iconClassName,
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
  /** String, className that will be added to option content */
  contentClassName: PropTypes.string,
  /** String, className that will be added to option icon in select */
  iconClassName: PropTypes.string,
  /** Object, style that will be added to option */
  style: PropTypes.object,
  /** Object, data that will be passed to option */
  data: PropTypes.any,
};

Option.defaultProps = {
  value: '',
  children: null,
  className: '',
  style: undefined,
  data: undefined,
  contentClassName: '',
  iconClassName: '',
};
