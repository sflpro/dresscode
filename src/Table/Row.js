import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableContext } from './TableContext';

import { Icon } from '../Icon';

import styles from './table.css';

export class Row extends React.Component {
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
  );

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
      ...props
    } = this.props;

    const {
      expanded,
      expandable,
    } = this.state;

    const tableRowClasses = classNames({
      [styles.tableRow]: true,
      [styles.tableRowExpanded]: expanded,
      [className]: true,
    });

    const tableRowWrapperClasses = classNames({
      [styles.tableRowWrapper]: true,
      [styles.tableRowWrapperHover]: hover,
    });

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
        <div
          ref={this.rowRef}
          className={tableRowClasses}
          {...props}
        >
          {children}
        </div>
        {expandable && !head && (
          <Icon
            onClick={this.handleExpandedChange}
            className={iconClasses}
            name={iconName}
            size={iconSize}
          />
        )}
      </div>
    );
  }
}

Row.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** Boolean, indicating element relation with table head */
  head: PropTypes.bool,
  /** Boolean, indicating the element highlighting possibility on hover */
  hover: PropTypes.bool,
  /** String, className that will be added to table div */
  className: PropTypes.string,
  /** Object, styles that will be added to table div */
  style: PropTypes.object,
};

Row.defaultProps = {
  head: false,
  hover: true,
  className: '',
  style: undefined,
};
