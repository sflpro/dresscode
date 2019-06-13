import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './fileInput.css';

export function FileInput({
  children,
  className,
  style,
  ...props
}) {
  const inputWrapperClasses = classNames({
    [styles.inputWrapper]: true,
    [className]: true,
  });

  return (
    <div
      className={inputWrapperClasses}
      style={style}
    >
      <input
        className={styles.fileInput}
        type='file'
        {...props}
      />
      {children}
    </div>
  );
}

FileInput.propTypes = {
  /** Any, what will be shown as file input */
  children: PropTypes.any.isRequired,
  /** String, classname that will be added to select */
  className: PropTypes.string,
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
};

FileInput.defaultProps = {
  className: undefined,
  style: undefined,
};
