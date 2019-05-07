import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from '.';

import { Icon } from '../Icon';

import styles from './table.css';

export class TableColumn extends React.Component {
  static contextType = TableContext;

  render() {
    const {
      id,
      width,
      visible: propsVisible,
      priority: propsPriority,
      minWidth: propsMinWidth,
      sortable,
      forwardedRef,
      head,
      className,
      style,
      children,
      ...props
    } = this.props;

    let visible = propsVisible;
    let priority = propsPriority;
    let minWidth = propsMinWidth;
    const {
      columns,
      gutters: {
        column: columnGutter,
      },
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
      [styles.tableHeadColumn]: head,
      [styles.invisibleColumn]: !visible,
      [styles.tableColumn]: true,
      [className]: true,
    });

    const tableColumnStyle = {
      ...style,
      order: priority,
      paddingLeft: columnGutter,
      paddingRight: columnGutter,
    };

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
        ref={forwardedRef}
        {...props}
      >
        {sortable && (
          <Icon
            name='sorting'
            className={styles.sortableIcon}
          />
        )}
        {!visible && (
          <span
            className={styles.headColumn}
          >
            {headColumn.children}
          </span>
        )}
        {children}
      </div>
    );
  }
}

TableColumn.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  priority: PropTypes.number,
  visible: PropTypes.bool,
  head: PropTypes.bool,
  minWidth: PropTypes.number,
  width: PropTypes.number,
  sortable: PropTypes.bool,
  forwardedRef: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableColumn.defaultProps = {
  priority: undefined,
  visible: true,
  head: false,
  minWidth: 1,
  width: undefined,
  sortable: false,
  forwardedRef: undefined,
  children: '',
  className: '',
  style: undefined,
};
