import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popover } from '../Popover';
import { TRIGGER_OPTIONS } from '../../utils';

import styles from './tooltip.css';

const TooltipContent = ({
  title = '',
  description,
  className = '',
  follow = false,
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
}

export class Tooltip extends React.Component {
  render() {
    const {
      trigger = TRIGGER_OPTIONS.HOVER,
      position = 'top',
      follow = false,
      arrow = true,
      gap = follow ? 10 : 0,
      children,
      ...props
    } = this.props;

    return (
      <Popover
        position={position}
        trigger={trigger}
        gap={gap}
        content={
          <TooltipContent
            {...props}
          />
        }
        follow={follow}
        arrow={arrow}
      >
        {children}
      </Popover>
    );
  }
}

Tooltip.propTypes = {
  title: PropTypes.string,
  description: PropTypes.any.isRequired,
  follow: PropTypes.bool,
  arrow: PropTypes.bool,
  trigger: PropTypes.oneOf(Object.values(TRIGGER_OPTIONS)),
  position: PropTypes.oneOf(['top', 'bottom']),
  gap: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};