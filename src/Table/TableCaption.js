import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

export function TableCaption({
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

TableCaption.propTypes = {
  /** String, caption title */
  title: PropTypes.string.isRequired,
  /** String or JSX or Element, caption icon element */
  icon: PropTypes.any,
  /** String, className that will be added to table div */
  className: PropTypes.string,
  /** Object, styles that will be added to table div */
  style: PropTypes.object,
};

TableCaption.defaultProps = {
  icon: null,
  className: '',
  style: undefined,
};
