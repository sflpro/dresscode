import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

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
  title: PropTypes.string.isRequired,
  icon: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableCaption.defaultProps = {
  icon: (
    <Icon
      name='more'
      size={24}
      className={styles.tableCaptionIcon}
    />
  ),
  className: '',
  style: undefined,
};
