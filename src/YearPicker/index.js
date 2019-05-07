import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Picker } from '../Picker';

import styles from './yearPicker.css';

export function YearPicker({
  selectedYear,
  years,
  onClick,
  style,
  ...props
}) {
  return (
    <Picker
      {...props}
    >
      {years.map((year) => {
        const yearClasses = classNames({
          [styles.yearPickerYear]: true,
          [styles.active]: year === selectedYear,
        });

        return (
          <div
            className={yearClasses}
            onClick={() => onClick(year)}
            key={year}
            style={style}
            role='presentation'
          >
            {year}
          </div>
        );
      })}
    </Picker>
  );
}

YearPicker.propTypes = {
  /** Array of numbers, selected year containing range */
  years: PropTypes.array.isRequired,
  /** Number, value of selected year */
  selectedYear: PropTypes.number.isRequired,
  /** Function, will be called when year is selected */
  onClick: PropTypes.func.isRequired,
  /** Object, styles that will be added to year picker wrapper */
  style: PropTypes.object,
  /** String, className that will be added to year picker wrapper */
  className: PropTypes.string,
};

YearPicker.defaultProps = {
  style: undefined,
  className: '',
};

YearPicker.defaultProps = {
  style: null,
};
