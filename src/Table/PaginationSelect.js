import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../Select';
import { Option } from '../Option';

import styles from './table.css';

export const PaginationSelect = ({
  options,
  onChange,
  className,
  value,
  ...props
}) => (
  <Select
    onChange={onChange}
    value={value}
    className={`${styles.paginationSelect} ${className}`}
    {...props}
  >
    {options.map(option => (
      <Option
        value={option}
        key={option}
      >
        {option}
      </Option>
    ))}
  </Select>
);

PaginationSelect.propTypes = {
  /** Number or string, items count to show per page */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  /** Function, will be called when select value changed */
  onChange: PropTypes.func.isRequired,
  /** Array, array of items per count choices */
  options: PropTypes.array,
  /** String, className that will be added to root div */
  className: PropTypes.string,
  /** Object, styles that will be added to root div */
  style: PropTypes.object,
};

PaginationSelect.defaultProps = {
  options: [10, 20, 50, 100],
  className: '',
  style: undefined,
};
