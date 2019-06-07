import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import { resizeTable } from './ResizeTable';

import styles from './table.css';

import { TableContext } from './TableContext';

import { Body } from './Body';
import { Caption } from './Caption';
import { Column } from './Column';
import { Footer } from './Footer';
import { Head } from './Head';
import { Pagination } from './Pagination';
import { Row } from './Row';


export class Table extends React.Component {
  constructor(props) {
    super(props);

    const { children } = this.props;

    this.gutters = {
      row: 8,
      column: 16,
    };

    const tableHead = children.find(child => child.type.name === 'Head');
    const tableRow = tableHead.props.children;

    const headColumns = tableRow.props.children.map(child => ({
      ...child.props,
      width: (child.props.width || child.props.minWidth) + 2 * this.gutters.column,
    }));

    this.state = {
      columns: headColumns,
    };

    this.onResizeThrottled = throttle(this.handleResize, 100);
    this.tableHeadRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeThrottled);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeThrottled);
  }

  handleResize = () => {
    const { columns } = this.state;
    const updatedColumns = resizeTable({
      width: this.tableHeadRef.current.getBoundingClientRect().width - 2 * this.gutters.row,
      columns,
    });

    this.setState({
      columns: updatedColumns,
    });
  }

  render() {
    const {
      sortOptions,
      onTableSort,
      className,
      children,
      ...props
    } = this.props;
    const { columns } = this.state;
    const tableClasses = classNames({
      [styles.table]: true,
      [styles.fullWidth]: true,
      [className]: true,
    });

    const sortableColumn = columns.find(column => column.sortable);
    if (sortableColumn && !sortOptions.prop) {
      sortOptions.column = sortableColumn.id;
    }

    return (
      <div
        className={tableClasses}
        ref={this.tableHeadRef}
        {...props}
      >
        <TableContext.Provider
          value={{
            columns,
            gutters: this.gutters,
            sortOptions,
            onTableSort,
          }}
        >
          {children}
        </TableContext.Provider>
      </div>
    );
  }
}

Table.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** Object, table sorting direction and the column id which should be displayed as sorted */
  sortOptions: PropTypes.object,
  /** Function, will be called when clicked on head sortable columns */
  onTableSort: PropTypes.func,
  /** String, className that will be added to table div */
  className: PropTypes.string,
  /** Object, styles that will be added to table div */
  style: PropTypes.object,
};

Table.defaultProps = {
  sortOptions: {
    direction: 'DESC',
    prop: null,
  },
  onTableSort: undefined,
  className: '',
  style: undefined,
};

Table.Body = Body;
Table.Caption = Caption;
Table.Column = Column;
Table.Footer = Footer;
Table.Head = Head;
Table.Pagination = Pagination;
Table.Row = Row;
