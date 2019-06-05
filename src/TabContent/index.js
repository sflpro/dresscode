import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './tabContent.css';

export function TabContent({
  className,
  children,
  ...props
}) {
  const tabContentClassNames = classNames({
    [className]: true,
    [styles.tabContent]: true,
  });

  return (
    <div
      className={tabContentClassNames}
      {...props}
    >
      {children}
    </div>
  );
}

TabContent.propTypes = {
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, style that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

TabContent.defaultProps = {
  className: '',
  style: undefined,
  children: null,
};
