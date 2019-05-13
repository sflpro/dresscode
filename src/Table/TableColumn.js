import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from '.';
import { SORTING_DIRECTIONS } from './constants';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import styles from './table.css';

export class TableColumn extends React.Component {
  static contextType = TableContext;

  state = {
    isEllipsis: false,
    renderTooltip: false,
  };

  componentDidMount() {
    const { width } = this.columnChildrenRef.getBoundingClientRect();
    this.columnChildrenWidth = width;

    this.isEllipsisActive();

    this.setState({
      renderTooltip: true,
    });
  }

  componentDidUpdate() {
    this.isEllipsisActive();
  }

  isEllipsisActive = () => {
    const { isEllipsis } = this.state;
    const { width } = this.tableColumnRef.getBoundingClientRect();
    const {
      gutters: {
        column: columnGutter,
      },
    } = this.context;

    if (width - 2 * columnGutter < this.columnChildrenWidth) {
      if (!isEllipsis) {
        this.setState({
          isEllipsis: true,
        });
      }
    } else if (isEllipsis) {
      this.setState({
        isEllipsis: false,
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
        direction: SORTING_DIRECTIONS.DESC === direction ? SORTING_DIRECTIONS.ASC : SORTING_DIRECTIONS.DESC,
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
      children,
      ...props
    } = this.props;

    const { isEllipsis, renderTooltip } = this.state;

    let visible = propsVisible;
    let priority = propsPriority;
    let minWidth = propsMinWidth;
    const {
      columns,
      gutters: {
        column: columnGutter,
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

    const tableColumnClasses = classNames({
      [styles.tableColumn]: true,
      [styles.tableHeadColumn]: head,
      [styles.invisibleColumn]: !visible,
      [styles.tableSortableColumn]: sortable,
      [className]: true,
    });

    const tableColumnStyle = {
      ...style,
      order: priority,
      paddingLeft: columnGutter,
      paddingRight: columnGutter,
    };

    const sortableIconClasses = classNames({
      [styles.sortableIcon]: true,
      [styles.sortableReverseIcon]: sortable && sortOptions.direction === SORTING_DIRECTIONS.DESC,
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

    return (
      <div
        className={tableColumnClasses}
        style={tableColumnStyle}
        ref={this.setRef}
        role='presentation'
        {...props}
        onClick={head && sortable ? () => this.handleSorting(id) : undefined}
        onMouseOver={!head ? this.isEllipsisActive : undefined}
        onFocus={() => { }}
      >
        {head && sortable && sortOptions.prop === id && (
          <Icon
            name='sorting'
            className={sortableIconClasses}
          />
        )}
        {!visible && (
          <span
            className={styles.headColumn}
          >
            {headColumn.children}
          </span>
        )}
        {renderTooltip && isEllipsis ? (
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
        )}
      </div>
    );
  }
}

TableColumn.propTypes = {
  /**  String or Number, column unique identifier */
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /** Number, specifies column priority in table */
  priority: PropTypes.number,
  /** Number, specifies column visibility on collapsed wiew */
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

TableColumn.defaultProps = {
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
