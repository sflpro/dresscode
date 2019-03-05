import React from 'react';
import PropTypes from 'prop-types';

import styles from './option.css';

export function Option({
  value = '',
  name,
  ...props
}) {
  return (
    <option
      value={value}
      className={styles.option}
      {...props}
    >
      {name}
    </option>
  );
}

Option.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
};