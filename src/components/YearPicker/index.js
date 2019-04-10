import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Picker } from '../Picker';

import styles from './yearPicker.css';

export function YearPicker({
  selectedYear,
  years,
  onClick,
  style = null,
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
  years: PropTypes.array.isRequired,
  selectedYear: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
};
