import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Picker } from '../Picker';

import styles from './monthPicker.css';

export function MonthPicker({
  selectedMonth,
  months,
  onClick = null,
  style = null,
  ...props
}) {
  return (
    <Picker
      {...props}
    >
      {months.map((month, monthIndex) => {
        const monthClasses = classNames({
          [styles.monthPickerMonth]: true,
          [styles.active]: monthIndex === selectedMonth,
        });

        return (
          <div
            className={monthClasses}
            onClick={() => onClick(monthIndex)}
            key={monthIndex}
            style={style}
            role='presentation'
          >
            {month}
          </div>
        );
      })}
    </Picker>
  );
}

MonthPicker.propTypes = {
  selectedMonth: PropTypes.number,
  months: PropTypes.array,
  onClick: PropTypes.func,
  style: PropTypes.object,
};
