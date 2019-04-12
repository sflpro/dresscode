import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './tag.css';

export function Tag({
  type,
  name,
  clickable,
  onClose,
  onClick,
  className,
  ...props
}) {
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles[type]]: true,
    [className]: true,
  });

  return (
    <span
      className={tagClasses}
      role='presentation'
      onClick={onClick}
      {...props}
    >
      <span className={styles.text}>
        {name}
      </span>
      {clickable && (
        <Icon
          className={styles.closeIcon}
          onClick={onClose}
          name='cross'
        />
      )}
    </span>
  );
}

Tag.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  clickable: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

Tag.defaultProps = {
  type: 'primary',
  name: '',
  clickable: false,
  onClose: undefined,
  onClick: undefined,
  className: '',
};
