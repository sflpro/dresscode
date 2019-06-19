import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popover, POPOVER_POSITIONS } from '../Popover';

import styles from './tooltip.css';

const TooltipContent = ({
  description,
  title,
  className,
  ...props
}) => {
  const tooltipClasses = classNames({
    [styles.tooltip]: true,
    [className]: true,
  });

  return (
    <div
      className={tooltipClasses}
      {...props}
    >
      {title && (
        <div className={styles.title}>
          {title}
        </div>
      )}
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
};

TooltipContent.propTypes = {
  /** String, JSX or Element, content of tooltip */
  description: PropTypes.any.isRequired,
  /** String, title of tooltip */
  title: PropTypes.string,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
};

TooltipContent.defaultProps = {
  title: '',
  className: '',
  style: undefined,
};

export class Tooltip extends React.Component {
  state = {
    open: false,
  };

  handleTargetEvent = (open) => {
    this.setState({
      open,
    });
  };

  render() {
    const {
      trigger,
      position,
      follow,
      arrow,
      gap = follow ? 10 : 0,
      popoverClassName,
      children,
      ...props
    } = this.props;
    const { open } = this.state;

    return (
      <Popover
        onTargetEvent={this.handleTargetEvent}
        className={popoverClassName}
        position={position}
        trigger={trigger}
        gap={gap}
        content={(
          <TooltipContent
            {...props}
          />
        )}
        follow={follow}
        arrow={arrow}
        open={open}
      >
        {children}
      </Popover>
    );
  }
}

Tooltip.propTypes = {
  /** String, JSX or Element, content of tooltip */
  description: PropTypes.any.isRequired,
  /** String, title of tooltip */
  title: PropTypes.string,

  /** Boolean, whether tooltip must move with mouse */
  follow: PropTypes.bool,
  /** Boolean, whether tooltip has arrow */
  arrow: PropTypes.bool,
  /** String, which action triggers tooltip to be shown */
  trigger: PropTypes.string,
  /** String, where tooltip must be shown */
  position: PropTypes.oneOf(Object.values(POPOVER_POSITIONS)),
  /** Number, distance between arrow(popover) and target */
  gap: PropTypes.number,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** String, className that will be added to popover component */
  popoverClassName: PropTypes.string,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.object,
  /** Boolean, whether popover must be displayed */
  popoverOpen: PropTypes.bool,
  /** JSX or Element, target */
  children: PropTypes.any,
};

Tooltip.defaultProps = {
  title: '',
  follow: false,
  arrow: true,
  trigger: 'hover',
  position: POPOVER_POSITIONS.TOP,
  gap: 0,
  className: '',
  popoverClassName: '',
  popoverOpen: undefined,
  style: undefined,
  children: null,
};
