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
      className={styles.option}
      value={value}
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
