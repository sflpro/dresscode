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
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

FileInput.defaultProps = {
  className: undefined,
  style: undefined,
};
