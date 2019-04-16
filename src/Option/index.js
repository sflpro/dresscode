import React from 'react';
import PropTypes from 'prop-types';

import styles from './option.css';

export function Option({
  value,
  name,
  ...props
}) {
  return (
    <option
      className={styles.option}
      value={value}
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
};

Option.defaultProps = {
  value: '',
  name: '',
};
