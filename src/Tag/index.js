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
  /** String, tag colors */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Boolean, whether tag has close icon */
  clickable: PropTypes.bool,
  /** Function, will be called when clicked on close icon */
  onClose: PropTypes.func,
  /** Function, that will be called when clicked on tag */
  onClick: PropTypes.func,
  /** String, text content of tag */
  name: PropTypes.string,
  /** Object, style that will be added to tag */
  style: PropTypes.object,
};

Tag.defaultProps = {
  type: 'primary',
  name: '',
  clickable: false,
  onClose: undefined,
  onClick: undefined,
  className: '',
  style: undefined,
};
