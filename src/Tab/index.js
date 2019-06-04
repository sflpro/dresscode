import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './tab.css';

export function Tab({
  title,
  uniqueKey,
  className,
  children,
  ...props
}) {
  const tabClassNames = classNames({
    [className]: true,
    [styles.tab]: true,
  });

  return (
    <div
      className={tabClassNames}
      {...props}
    >
      {children}
    </div>
  );
}

Tab.propTypes = {
  /** String, title of tab */
  title: PropTypes.string,
  /** String, unique key of tab */
  uniqueKey: PropTypes.string,
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, style that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Tab.defaultProps = {
  title: '',
  uniqueKey: '',
  className: '',
  style: undefined,
  children: null,
};
