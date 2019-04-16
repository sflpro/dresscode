import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './datePickerNavbar.css';

export function DatePickerNavbar({
  onPreviousClick,
  onNextClick,
}) {
  const leftIconStyles = classNames({
    [styles.navbarIcon]: true,
    [styles.left]: true,
  });
  const rightIconStyles = classNames({
    [styles.navbarIcon]: true,
    [styles.right]: true,
  });
  return (
    <div
      className={styles.navbar}
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
};
