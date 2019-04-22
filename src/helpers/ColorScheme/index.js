import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './colorScheme.css';

export function ColorScheme({
  text,
  name,
  className,
  bgClassName,
  secondaryName,
  secondaryClassName,
  ...props
}) {
  const colorSchemeClasses = classNames({
    [className]: true,
    [styles.colorScheme]: true,
    [styles[bgClassName]]: bgClassName,
    [styles[secondaryClassName]]: secondaryClassName,
  });

  return (
    <div
      className={colorSchemeClasses}
      {...props}
    >
      <div className={styles.textColor}>
        <div className={styles.textBlock}>
          <span>
            {name}
          </span>
          {secondaryClassName ? (
            <span>
              {secondaryName}
            </span>
          ) : ''}
        </div>
      </div>
      <div className={styles.textType}>
        {text}
      </div>
    </div>
  );
}

ColorScheme.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  bgClassName: PropTypes.string,
  secondaryName: PropTypes.string,
  secondaryClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

ColorScheme.defaultProps = {
  text: '',
  name: '',
  bgClassName: '',
  secondaryName: '',
  secondaryClassName: '',
  className: '',
  style: undefined,
};
