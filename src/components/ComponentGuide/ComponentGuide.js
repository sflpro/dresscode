import React from 'react';
import PropTypes from 'prop-types';
import styles from './componentGuide.css';


export default function ComponentGuide({ children }) {
  return (
    <div className={styles.row}>
      <div className={styles.small}>
        <label>Small Input</label>
        {children}
      </div>
      <div className={styles.medium}>
        <label>Medium Input</label>
        {children}
      </div>
    </div>
  );
}

ComponentGuide.propTypes = {
  children: PropTypes.any.isRequried,
};
