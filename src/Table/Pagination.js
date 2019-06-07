import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from './TableContext';

import { Icon } from '../Icon';

import styles from './table.css';

const PAGES_GAP = '...';

export class Pagination extends React.Component {
  static contextType = TableContext;

  createRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  getPageRange = (page, pageCount, total) => (
    `${(page - 1) * pageCount + 1} - ${page * pageCount > total ? total : (page * pageCount)}`
  );

  renderPageRange = (page, pageCount, total) => (
    <div className={styles.tablePageRange}>
      {`${this.getPageRange(page, pageCount, total)} / ${total}`}
    </div>
  );

  renderPages = () => {
    const {
      page,
      pageCount,
      total,
      pageSiblingCount,
      onPageClick,
    } = this.props;

    const lastPage = Math.ceil(total / pageCount);

    let mainPageNumbers = [];
    let firstPageNumbers = [1];
    let lastPageNumbers = [lastPage];
    if (lastPage < 5 + 2 * pageSiblingCount) {
      firstPageNumbers = [];
      mainPageNumbers = this.createRange(1, lastPage);
      lastPageNumbers = [];
    } else if (page < 4) {
      firstPageNumbers = this.createRange(1, 5);
      mainPageNumbers = [PAGES_GAP];
    } else if (page > lastPage - (pageSiblingCount * 2 + 1)) {
      mainPageNumbers = [PAGES_GAP];
      lastPageNumbers = this.createRange(lastPage - 4, lastPage);
    } else {
      mainPageNumbers = [PAGES_GAP, ...this.createRange(page - 1, page + 1), PAGES_GAP];
    }

    const pageNumbers = [
      ...firstPageNumbers,
      ...mainPageNumbers,
      ...lastPageNumbers,
    ];

    return (
      <div className={styles.tablePages}>
        <div
          className={styles.tablePageNumber}
          onClick={page !== 1 ? () => onPageClick(page - 1) : null}
          role='presentation'
        >
          <Icon
            name='arrow-left'
          />
        </div>
        {pageNumbers.map((pageNumber, index) => {
          const selectedPageClasses = classNames({
            [styles.tablePageNumber]: true,
            [styles.tablePageNumberSelected]: pageNumber === page,
            [styles.tablePageNumberClickable]: pageNumber !== PAGES_GAP,
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
        <div
          onClick={page !== lastPage ? () => onPageClick(page + 1) : null}
          className={styles.tablePageNumber}
          role='presentation'
        >
          <Icon
            name='arrow-right'
          />
        </div>
      </div>
    );
  };

  render() {
    const {
      page,
      pageCount,
      total,
      pageSiblingCount,
      onPageClick,
      className,
      ...props
    } = this.props;

    const tablePaginationClasses = classNames({
      [styles.tablePagination]: true,
    });

    return (
      <div
        className={tablePaginationClasses}
        {...props}
      >
        {this.renderPageRange(page, pageCount, total)}
        {this.renderPages()}
      </div>
    );
  }
}

Pagination.propTypes = {
  /** Number, selected page number */
  page: PropTypes.number.isRequired,
  /** Number, total count of items */
  total: PropTypes.number.isRequired,
  /** Function, the method to call when a page is clicked. */
  onPageClick: PropTypes.func.isRequired,
  /** Number, count of items per page */
  pageCount: PropTypes.number,
  /** Number, count of selected page siblings which will be shown */
  pageSiblingCount: PropTypes.number,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
};

Pagination.defaultProps = {
  pageCount: 10,
  pageSiblingCount: 1,
  className: '',
  style: undefined,
};
