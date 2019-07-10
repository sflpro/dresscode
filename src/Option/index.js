import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './option.css';

export function Option({
  value,
  children,
  className,
  ...props
}) {
  const optionClassNames = classNames({
    [styles.option]: true,
    [className]: true,
  });

  return (
    <option
      className={optionClassNames}
      value={value}
      {...props}
    >
      {children}
    </option>
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
};

Option.defaultProps = {
  value: '',
  children: null,
  className: '',
};
