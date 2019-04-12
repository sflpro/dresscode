import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popover } from '../Popover';

import styles from './tooltip.css';

const TooltipContent = ({
  description,
  title,
  className,
  style,
  ...props
}) => {
  const tooltipClasses = classNames({
    [styles.tooltip]: true,
    [className]: true,
  });

  return (
    <div
      className={tooltipClasses}
      style={style}
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
  description: PropTypes.any.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

TooltipContent.defaultProps = {
  title: '',
  className: '',
  style: {},
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
      children,
      ...props
    } = this.props;
    const { open } = this.state;

    return (
      <Popover
        onTargetEvent={this.handleTargetEvent}
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
  description: PropTypes.any.isRequired,
  title: PropTypes.string,
  follow: PropTypes.bool,
  arrow: PropTypes.bool,
  trigger: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  gap: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

Tooltip.defaultProps = {
  title: '',
  follow: false,
  arrow: true,
  trigger: 'hover',
  position: 'top',
  gap: 0,
  className: '',
  style: null,
  children: null,
};
