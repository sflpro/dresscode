import React from 'react';
import PropTypes from 'prop-types';

import styles from './itemGroup.css';

export function ItemGroup({
  title,
  children,
  style,
  ...props
}) {
  return (
    <div
      className={styles.group}
      style={style}
      {...props}
    >
      {title && (
        <h3>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

ItemGroup.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
  style: PropTypes.object,
};

ItemGroup.defaultProps = {
  title: '',
  style: undefined,
};
