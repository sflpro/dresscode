import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import { resizeTable } from './ResizeTable';

import styles from './table.css';

export const TableContext = React.createContext();

export class Table extends React.Component {
  constructor(props) {
    super(props);

    const { children } = this.props;

    this.gutters = {
      row: 8,
      column: 16,
    };

    const tableHead = children.find(child => child.type.displayName === 'TableHead');
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
  children: PropTypes.any.isRequired,
  sortOptions: PropTypes.object,
  onTableSort: PropTypes.func,
  className: PropTypes.string,
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
