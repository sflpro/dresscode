import React from 'react';
import PropTypes from 'prop-types';

import styles from './itemGroup.css';

import { Label } from '../Label';

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
        <Label
          text={title}
          className={styles.title}
        />
      )}
      {children}
    </div>
  );
}

ItemGroup.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};