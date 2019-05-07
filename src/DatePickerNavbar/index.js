import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './datePickerNavbar.css';

export function DatePickerNavbar({
  onPreviousClick,
  onNextClick,
  className,
  style,
  ...props
}) {
  const leftIconStyles = classNames({
    [styles.navbarIcon]: true,
    [styles.left]: true,
  });
  const rightIconStyles = classNames({
    [styles.navbarIcon]: true,
    [styles.right]: true,
  });
  const navbarClasses = classNames({
    [styles.navbar]: true,
    [className]: true,
  });
  return (
    <div
      className={navbarClasses}
      {...props}
    >
      <Icon
        name='arrow-left'
        size={24}
        className={leftIconStyles}
        onClick={() => onPreviousClick()}
      />
      <Icon
        name='arrow-right'
        size={24}
        className={rightIconStyles}
        onClick={() => onNextClick()}
      />
    </div>
  );
}

DatePickerNavbar.propTypes = {
  /** Function, will be called when clicked on "previous" icon */
  onPreviousClick: PropTypes.func.isRequired,
  /** Function, will be called when clicked on "next" icon */
  onNextClick: PropTypes.func.isRequired,
  /** String, className that will be added to navbar div */
  className: PropTypes.string,
  /** Object, styles that will be added navbar div */
  style: PropTypes.object,
};

DatePickerNavbar.defaultProps = {
  className: '',
  style: undefined,
};
