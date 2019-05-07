import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from '.';

import { Icon } from '../Icon';

import styles from './table.css';

export class TableRow extends React.Component {
  static contextType = TableContext;

  constructor(props, context) {
    super(props, context);

    this.rowRef = React.createRef();

    const { columns } = this.context;
    const expandable = this.isExpandable(columns);

    this.state = {
      expanded: false,
      expandable,
    };
  }

  componentDidUpdate() {
    const { expanded, expandable } = this.state;
    const { columns } = this.context;
    const nextExpandable = this.isExpandable(columns);

    if (nextExpandable !== expandable) {
      this.handleExpandableChange(nextExpandable);
    }

    if (!nextExpandable && expanded) {
      this.handleExpandedChange();
    }
  }

  handleExpandableChange = (expandable) => {
    this.setState({
      expandable,
    });
  };

  isExpandable = columns => (
    columns.findIndex(column => column.visible === false) !== -1
  )

  handleExpandedChange = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    const {
      hover,
      head,
      className,
      children,
      style,
      ...props
    } = this.props;

    const {
      expanded,
      expandable,
    } = this.state;

    const {
      gutters: { row: rowGutter },
    } = this.context;

    const tableRowClasses = classNames({
      [styles.tableRow]: true,
      [styles.tableRowExpanded]: expanded,
      [className]: true,
    });

    const tableRowWrapperClasses = classNames({
      [styles.tableRowWrapper]: true,
      [styles.tableRowWrapperHover]: hover,
    });

    const tableRowStyle = {
      ...style,
      paddingLeft: rowGutter,
      paddingRight: rowGutter,
    };

    const iconName = expanded ? 'arrow-up' : 'arrow-down';
    const iconClasses = classNames({
      [styles.tableRowIcon]: true,
      [styles[iconName]]: true,
    });
    const iconSize = 16;

    return (
      <div
        className={tableRowWrapperClasses}
      >
        <div className={styles.tableRowOverlay} />
        {expandable && !head && (
          <Icon
            onClick={this.handleExpandedChange}
            className={iconClasses}
            name={iconName}
            size={iconSize}
          />
        )}
        <div
          ref={this.rowRef}
          className={tableRowClasses}
          style={tableRowStyle}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
}

TableRow.propTypes = {
  children: PropTypes.any.isRequired,
  head: PropTypes.bool,
  hover: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableRow.defaultProps = {
  head: false,
  hover: true,
  className: '',
  style: undefined,
};
