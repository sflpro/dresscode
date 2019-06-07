import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from './TableContext';
import { dynamicSort } from './ResizeTable';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import styles from './table.css';

export const SORTING_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};
export class Column extends React.Component {
  static contextType = TableContext;

  state = {
    didOverflow: false,
    renderTooltip: false,
  };

  componentDidMount() {
    const { width } = this.columnChildrenRef.getBoundingClientRect();
    this.columnChildrenWidth = width;

    this.checkTextOverflow();

    this.setState({
      renderTooltip: true,
    });
  }

  componentDidUpdate() {
    this.checkTextOverflow();
  }

  checkTextOverflow = () => {
    const { didOverflow } = this.state;
    const { width } = this.tableColumnRef.getBoundingClientRect();
    const {
      gutters: {
        column: columnGutter,
      },
    } = this.context;

    if (width - 2 * columnGutter < this.columnChildrenWidth) {
      if (!didOverflow) {
        this.setState({
          didOverflow: true,
        });
      }
    } else if (didOverflow) {
      this.setState({
        didOverflow: false,
      });
    }
  };

  handleSorting = (id) => {
    const {
      sortOptions: { direction, prop },
      onTableSort,
    } = this.context;
    if (prop !== id) {
      onTableSort({
        direction,
        prop: id,
      });
    } else {
      onTableSort({
        direction: SORTING_DIRECTIONS.DESC === direction
          ? SORTING_DIRECTIONS.ASC : SORTING_DIRECTIONS.DESC,
        prop,
      });
    }
  };

  setRef = (ref) => {
    this.tableColumnRef = ref;
  };

  setChildrenRef = (ref) => {
    this.columnChildrenRef = ref;
  };

  renderColumnContent = ({ children }) => {
    const { didOverflow, renderTooltip } = this.state;
    return (
      renderTooltip && didOverflow ? (
        <Tooltip
          description={children}
          popoverClassName={styles.ellipsisColumn}
          trigger='hover'
        >
          {children}
        </Tooltip>
      ) : (
        <span ref={this.setChildrenRef}>
          {children}
        </span>
      )
    );
  };

  renderHeadColumn = ({
    id,
    headColumn: { sortable },
    sortIconClasses,
    setRef = true,
    children,
    ...props
  }) => {
    const {
      sortOptions,
    } = this.context;

    return (
      <div
        ref={setRef ? this.setRef : undefined}
        role='presentation'
        {...props}
        onClick={sortable ? () => this.handleSorting(id) : undefined}
      >
        {sortable && sortOptions.prop === id && (
          <Icon
            name='sorting'
            className={sortIconClasses}
          />
        )}
        {this.renderColumnContent({ children })}
      </div>
    );
  };

  renderColumn = ({
    children,
    visible,
    headColumn,
    sortIconClasses,
    className,
    style,
    ...props
  }) => {
    const tableColumnClasses = classNames({
      [className]: true,
      [styles.invisibleColumn]: !visible,
    });

    const invisibleHeadColumnClasses = classNames({
      [className]: true,
      [styles.tableHeadColumnForInvisibleColumn]: !visible,
    });

    return (
      <div
        ref={this.setRef}
        role='presentation'
        className={tableColumnClasses}
        style={style}
        {...props}
        onMouseOver={this.checkTextOverflow}
        onFocus={() => { }}
      >
        {!visible && (
          this.renderHeadColumn({
            children: headColumn.children,
            setRef: false,
            headColumn,
            className: invisibleHeadColumnClasses,
            ...props,
          })
        )}
        {this.renderColumnContent({ children })}
      </div>
    );
  };

  render() {
    const {
      id,
      width,
      visible: propsVisible,
      priority: propsPriority,
      minWidth: propsMinWidth,
      sortable,
      head,
      className,
      style,
      ...props
    } = this.props;

    let visible = propsVisible;
    let priority = propsPriority;
    let minWidth = propsMinWidth;
    const {
      columns,
      gutters: {
        column: columnGutter,
        row: rowGutter,
      },
      sortOptions,
    } = this.context;

    const headColumn = columns.find(column => column.id === id);
    if (headColumn) {
      const {
        visible: headColumnVisible,
        priority: headColumnPriority,
        minWidth: headColumnMinWidth,
      } = headColumn;
      visible = headColumnVisible;
      priority = headColumnPriority;
      minWidth = headColumnMinWidth;
    }

    const visibleColumns = columns.filter(column => column.visible)
      .sort(dynamicSort({ column: 'priority' }));

    const tableColumnClasses = classNames({
      [styles.tableColumn]: true,
      [styles.tableHeadColumn]: head,
      [styles.tableSortableColumn]: sortable,
      [className]: true,
    });

    const tableColumnStyle = {
      ...style,
      order: priority,
      paddingLeft: columnGutter,
      paddingRight: columnGutter,
    };

    if (visibleColumns[0].id === id) {
      tableColumnStyle.paddingLeft += rowGutter;
    }

    if (visibleColumns[visibleColumns.length - 1].id === id) {
      tableColumnStyle.paddingRight += rowGutter;
    }

    const sortIconClasses = classNames({
      [styles.sortIcon]: true,
      [styles.sortReverseIcon]: headColumn.sortable && sortOptions.direction === SORTING_DIRECTIONS.DESC,
    });

    if (width) {
      tableColumnStyle.width = width;
    } else if (minWidth) {
      tableColumnStyle.minWidth = minWidth;
    } else {
      tableColumnStyle.flex = 1;
    }

    if (!visible && !head) {
      tableColumnStyle.flex = `0 0 calc(100% - ${2 * columnGutter}px)`;
    }

    const columnProps = {
      className: tableColumnClasses,
      style: tableColumnStyle,
      id,
      sortIconClasses,
      headColumn,
      visible,
      ...props,
    };

    if (head) {
      return this.renderHeadColumn(columnProps);
    }

    return this.renderColumn(columnProps);
  }
}

Column.propTypes = {
  /**  String or Number, column unique identifier */
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /** Number, specifies column priority in table */
  priority: PropTypes.number,
  /** Boolean, specifies column visibility on collapsed wiew */
  visible: PropTypes.bool,
  /** Boolean, indicating element relation with table head */
  head: PropTypes.bool,
  /** Number, specifies column min width in px */
  minWidth: PropTypes.number,
  /** Number, specifies column width in px */
  width: PropTypes.number,
  /** Boolean, indicate the possibility that table can be sorted by this column */
  sortable: PropTypes.bool,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
  /** String, className that will be added to table div */
  className: PropTypes.string,
  /** Object, styles that will be added to table div */
  style: PropTypes.object,
};

Column.defaultProps = {
  priority: undefined,
  visible: true,
  head: false,
  minWidth: 1,
  width: undefined,
  sortable: false,
  children: '',
  className: '',
  style: undefined,
};
