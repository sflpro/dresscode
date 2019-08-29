import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './table.css';

const PAGES_GAP = '...';

export const Pagination = ({
  page,
  itemsPerPage,
  total,
  pageSiblingCount,
  paginationControlsCount,
  onPageClick,
  className,
  nextElem,
  previousElem,
  ...props
}) => {
  const lastPage = Math.ceil(total / itemsPerPage);

  const createRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  let mainPageNumbers = [];
  let firstPageNumbers = [1];
  let lastPageNumbers = [lastPage];
  if (lastPage < paginationControlsCount) {
    firstPageNumbers = [];
    mainPageNumbers = createRange(1, lastPage);
    lastPageNumbers = [];
  } else if (page < 4) {
    firstPageNumbers = createRange(1, paginationControlsCount - 2);
    mainPageNumbers = [PAGES_GAP];
  } else if (page > lastPage - (pageSiblingCount * 2 + 1)) {
    mainPageNumbers = [PAGES_GAP];
    lastPageNumbers = createRange(lastPage - (paginationControlsCount - 3), lastPage);
  } else {
    mainPageNumbers = [PAGES_GAP, ...createRange(page - 1, page + 1), PAGES_GAP];
  }

  const pageNumbers = [
    ...firstPageNumbers,
    ...mainPageNumbers,
    ...lastPageNumbers,
  ];

  return (
    <div
      className={`${styles.tablePagination} ${className}`}
      {...props}
    >
      {nextElem && (
        <div
          className={styles.paginationItem}
          onClick={page !== 1 ? () => onPageClick(page - 1) : null}
          role='presentation'
        >
          {previousElem}
        </div>
      )}
      {pageNumbers.map((pageNumber, index) => {
        const selectedPageClasses = classNames({
          [styles.paginationItem]: true,
          [styles.paginationItemSelected]: pageNumber === page,
          [styles.paginationItemClickable]: pageNumber !== PAGES_GAP,
        });

        return (
          <div
            className={selectedPageClasses}
            onClick={pageNumber !== PAGES_GAP ? () => onPageClick(pageNumber) : null}
            role='presentation'
            key={index}
          >
            {pageNumber}
          </div>
        );
      })}
      {nextElem && (
        <div
          onClick={page !== lastPage ? () => onPageClick(page + 1) : null}
          className={styles.paginationItem}
          role='presentation'
        >
          {nextElem}
        </div>
      )}
    </div>
  );
};

Pagination.propTypes = {
  /** Number, selected page number */
  page: PropTypes.number.isRequired,
  /** Number, total count of items */
  total: PropTypes.number.isRequired,
  /** Function, the method to call when a page is clicked. */
  onPageClick: PropTypes.func.isRequired,
  /** Number, count of items per page */
  itemsPerPage: PropTypes.number,
  /** Number, count of selected page siblings which will be shown */
  pageSiblingCount: PropTypes.number,
  /** Number, count of pagination controls which will be shown */
  paginationControlsCount: PropTypes.number,
  /** String, className that will be added to root div */
  className: PropTypes.string,
  /** Object, styles that will be added to root div */
  style: PropTypes.object,
  /** String or JSX or Element, next page element */
  nextElem: PropTypes.any,
  /** String or JSX or Element, previous page element */
  previousElem: PropTypes.any,
};

Pagination.defaultProps = {
  itemsPerPage: 10,
  pageSiblingCount: 1,
  paginationControlsCount: 5,
  className: '',
  style: undefined,
  nextElem: null,
  previousElem: null,
};
