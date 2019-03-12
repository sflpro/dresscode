import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './tag.css';

export function Tag({
  type = 'primary',
  name = '',
  clickable = false,
  onClose,
  onClick,
  ...props
}) {
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles[type]]: true,
  });

  return (
    <span
      className={tagClasses}
      onClick={onClick}
      {...props}
    >
      {name}
      {clickable && (
        <Icon
          name='close'
          className={styles.closeIcon}
        />
      )}
    </span>
  );
}

Tag.propTypes = {
  name: PropTypes.string,
  clickable: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary']),
};