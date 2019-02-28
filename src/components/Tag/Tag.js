import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './tag.css';


export function Tag({ type, name, clickable, onClose, onClick }) {
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles[type]]: true,
  });

  return (
    <span className={tagClasses} onClick={onClick}>
      {name}
      {clickable && <span className={styles.closeIcon} onClick={onClose}>x</span>}
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

Tag.defaultProps = {
  name: '',
  clickable: false,
  type: 'primary',
  onClose: undefined,
  onClick: undefined,
};