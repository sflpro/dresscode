import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from './TableContext';
import { dynamicSort } from './ResizeTable';
import { getDebounce } from '../utils';
import { Tooltip } from '../Tooltip';
import { Icon } from '../Icon';

import styles from './table.css';

export const SORTING_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};
export class Column extends React.Component {
  state = {
    didOverflow: false,
    renderTooltip: false,
  };

  componentDidMount() {
    this.checkTextOverflowByDebounce = getDebounce(this.checkTextOverflow, 0);
    const { width } = this.columnChildrenRef.getBoundingClientRect();
    this.columnChildrenWidth = width;

    this.checkTextOverflow();

    this.setState({
      renderTooltip: true,
    });
  }

  componentDidUpdate() {
    this.checkTextOverflowByDebounce();
  }

  checkTextOverflow = () => {
    const { didOverflow } = this.state;

    if (!this.tableColumnRef) {
      return;
    }

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

  static contextType = TableContext;

  renderColumnContent = ({ children, contentClassName = '' }) => {
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
        <span className={contentClassName} ref={this.setChildrenRef}>
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
    visible,
    contentClassName,
    invisibleColumnClassName,
    ...props
  }) => {
    const { defaultSortIcon, descSortIcon, ascSortIcon } = this.props;
    const { sortOptions } = this.context;

    const isDesc = sortOptions.direction === SORTING_DIRECTIONS.DESC;
    const isSorted = sortable && sortOptions.prop === id;

    return (
      <div
        ref={setRef ? this.setRef : undefined}
        role='presentation'
        {...props}
        onClick={sortable ? () => this.handleSorting(id) : undefined}
      >
        {(!isSorted && defaultSortIcon) ? defaultSortIcon : null}
        {(isSorted && !isDesc) && (ascSortIcon || (
          <Icon
            className={styles.sortIcon}
            name='sorting'
          />
        ))}
        {(isSorted && isDesc) && (descSortIcon || (
          <Icon
            className={classNames({
              [styles.sortReverseIcon]: true,
              [styles.sortIcon]: true,
            })}
            name='sorting'
          />
        ))}
        {this.renderColumnContent({ children, contentClassName })}
      </div>
    );
  };

  renderColumn = ({
    children,
    visible,
    headColumn,
    className,
    contentClassName,
    invisibleColumnClassName,
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
      [invisibleColumnClassName]: !visible,
    });

    const contentClasses = classNames({
      [contentClassName]: !!contentClassName,
      [styles.limitedInvisibleColumn]: !visible,
      [styles.invisibleColumnChildren]: !visible,
    });

    return (
      <div
        ref={this.setRef}
        role='presentation'
        className={tableColumnClasses}
        style={style}
        {...props}
        onMouseOver={this.checkTextOverflowByDebounce}
        onFocus={() => { }}
      >
        {!visible && (
          this.renderHeadColumn({
            children: headColumn.children,
            setRef: false,
            headColumn,
            className: invisibleHeadColumnClasses,
            contentClassName: styles.limitedInvisibleColumn,
            ...props,
          })
        )}
        {this.renderColumnContent({ children, contentClassName: contentClasses })}
      </div>
    );
  };

  render() {
    const {
      id,
      alwaysVisible,
      visible: propsVisible,
      priority: propsPriority,
      minWidth: propsMinWidth,
      sortable,
      head,
      className,
      contentClassName,
      style,
      invisibleColumnClassName,
      defaultSortIcon,
      descSortIcon,
      ascSortIcon,
      ...props
    } = this.props;

    let width;
    let hasDefaultWidth;
    let visible = propsVisible;
    let priority = propsPriority;
    let minWidth = propsMinWidth;
    const {
      columns,
      gutters: {
        column: columnGutter,
        row: rowGutter,
      },
    } = this.context;

    const headColumn = columns.find(column => column.id === id);
    if (headColumn) {
      ({
        visible,
        priority,
        minWidth,
        width,
        hasDefaultWidth,
      } = headColumn);
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

    if (hasDefaultWidth) {
      tableColumnStyle.width = width - 2 * columnGutter;
    } else {
      tableColumnStyle.flex = 1;
    }

    if (minWidth) {
      tableColumnStyle.minWidth = minWidth;
    }

    if (!visible) {
      if (head) {
        tableColumnStyle.display = 'none';
      } else {
        tableColumnStyle.flex = `0 0 calc(100% - ${2 * columnGutter}px)`;
      }
    }

    const columnProps = {
      className: tableColumnClasses,
      invisibleColumnClassName,
      style: tableColumnStyle,
      contentClassName,
      headColumn,
      visible,
      id,
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
  /** Boolean, specifies if column is always visible */
  alwaysVisible: PropTypes.bool,
  /** Boolean, specifies column visibility on collapsed view */
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
  /** String, className that will be added to table column div */
  className: PropTypes.string,
  /** String, className that will be added to table column content */
  contentClassName: PropTypes.string,
  /** String, className that will be added to invisible column */
  invisibleColumnClassName: PropTypes.string,
  /** Object, styles that will be added to table div */
  style: PropTypes.object,
  /** element, will be used as icon of not sorted sortable column */
  defaultSortIcon: PropTypes.any,
  /** element, will be used as icon of asc sortable column */
  ascSortIcon: PropTypes.any,
  /** element, will be used as icon of desc sortable column */
  descSortIcon: PropTypes.any,
};

Column.defaultProps = {
  priority: undefined,
  alwaysVisible: false,
  visible: true,
  head: false,
  minWidth: 1,
  width: undefined,
  sortable: false,
  children: '',
  className: '',
  contentClassName: '',
  style: undefined,
  invisibleColumnClassName: '',
  defaultSortIcon: undefined,
  ascSortIcon: undefined,
  descSortIcon: undefined,
};
