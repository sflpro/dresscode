import React from 'react';
import PropTypes from 'prop-types';

export function OptGroup(props) {
  return (
    <optgroup {...props} />
  );
}

OptGroup.propTypes = {
  /** String, label of group option */
  label: PropTypes.string.isRequired,
  /** String, children of option */
  children: PropTypes.any,
  /** String, className that will be added to group option */
  className: PropTypes.string,
  /** Object, style that will be added to option */
  style: PropTypes.object,
};

OptGroup.defaultProps = {
  children: null,
  className: '',
  style: undefined,
};
