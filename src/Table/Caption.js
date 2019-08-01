import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function Caption({
  title,
  icon,
  className,
  ...props
}) {
  const tableCaptionClasses = classNames({
    [styles.tableCaption]: true,
    [className]: true,
  });

  return (
    <div
      className={tableCaptionClasses}
      {...props}
    >
      {title}
      {icon}
    </div>
  );
}

Caption.propTypes = {
  /** String | ReactNode, caption title */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  /** String or JSX or Element, caption icon element */
  icon: PropTypes.any,
  /** String, className that will be added to table div */
  className: PropTypes.string,
  /** Object, styles that will be added to table div */
  style: PropTypes.object,
};

Caption.defaultProps = {
  icon: null,
  className: '',
  style: undefined,
};
