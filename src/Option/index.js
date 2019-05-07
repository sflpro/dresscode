import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './option.css';

export function Option({
  name,
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
      {...props}
    >
      {name}
    </option>
  );
}

Option.propTypes = {
  /** String, value of option */
  value: PropTypes.string,
  /** String, name of option */
  name: PropTypes.string,
  /** String, className that will be added to option */
  className: PropTypes.string,
  /** Object, styles that will be added to option */
  style: PropTypes.string,
};

Option.defaultProps = {
  value: '',
  name: '',
  className: '',
  style: undefined,
};
