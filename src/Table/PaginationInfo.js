import React from 'react';
import PropTypes from 'prop-types';

import styles from './table.css';

export const PaginationInfo = ({
  page,
  itemsPerPage,
  total,
  className,
  ...props
}) => {
  const getPageRange = () => (
    `${(page - 1) * itemsPerPage + 1} - ${page * itemsPerPage > total ? total : (page * itemsPerPage)}`
  );

  return (
    <div
      className={styles.tablePaginationInfo}
      {...props}
    >
      {`${getPageRange()} / ${total}`}
    </div>
  );
};

PaginationInfo.propTypes = {
  /** Number, selected page number */
  page: PropTypes.number.isRequired,
  /** Number, total count of items */
  total: PropTypes.number.isRequired,
  /** Number, count of items per page */
  itemsPerPage: PropTypes.number,
  /** String, className that will be added to root div */
  className: PropTypes.string,
  /** Object, styles that will be added to root div */
  style: PropTypes.object,
};

PaginationInfo.defaultProps = {
  itemsPerPage: 10,
  className: '',
  style: undefined,
};
