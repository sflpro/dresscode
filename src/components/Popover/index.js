import React from 'react';
import PropTypes from 'prop-types';

import styles from './popover.css';

const TRIGGER_OPTIONS = {
  CLICK: 'click',
  HOVER: 'hover',
};

export class Popover extends React.Component {
  contentRef = React.createRef();
  targetRef = React.createRef();

  state = {
    open: false,
  };

  setPopoverPosition = (targetElementPosition) => {
    const { offsetWidth: popoverWidth, offsetHeight: popoverHeight } = this.contentRef.current;

    const popoverElementPosition = {
      popoverWidth,
      popoverHeight,
    };

    const [popoverX, popoverY] = this.computePopoverPosition(targetElementPosition, popoverElementPosition);

    this.contentRef.current.style.top = `${popoverY}px`;
    this.contentRef.current.style.left = `${popoverX}px`;
  }

  computePopoverPosition = (targetElementPosition, popoverElementPosition) => {
    const { coordinates, width, height } = targetElementPosition;
    const { x: pLeft, y: pTop } = coordinates;

    const { popoverHeight, popoverWidth } = popoverElementPosition;
    let calcX = pLeft - ((popoverWidth - width) / 2);

    if (popoverWidth + calcX > window.innerWidth) {
      calcX = calcX + window.innerWidth - (popoverWidth + calcX);
    }

    calcX = Math.max(calcX, 0);

    let position;
    let windowYOffset = window.pageYOffset;

    const arrowHeight = 0; //TODO

    let arrowY = pTop - arrowHeight - 9;
    let calcY = arrowY - popoverHeight + 1;

    if (calcY < 0 || calcY - windowYOffset < 0) {
      calcY = pTop + height + 12;
    }

    return [calcX, calcY, position];
  }

  handleClick = (event) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = event.target;
    const targetElementPosition = {
      width: offsetWidth,
      height: offsetHeight,
      coordinates: {
        x: offsetLeft,
        y: offsetTop,
      },
    };

    this.setState(prevState => ({
      open: !prevState.open,
    }), () => {
      const { open } = this.state;
      if (open) {
        this.setPopoverPosition(targetElementPosition);
      }
    });
  };

  handleMouseEnter = (event) => {
   
  };

  handleMouseLeave = (event) => {
   
  };

  getTargetElementProps = (trigger) => {
    const targetElementProps = {};
    if (trigger === TRIGGER_OPTIONS.CLICK) {
      targetElementProps.onClick = this.handleClick;
    } else if (trigger === TRIGGER_OPTIONS.HOVER) {
      targetElementProps.onMouseEnter = this.handleMouseEnter;
      targetElementProps.onMouseLeave = this.handleMouseLeave;
    }
    return targetElementProps;
  };
 
  render() {
    const {
      content: ContentComponent,
      trigger = TRIGGER_OPTIONS.CLICK,
      className,
      style,
      children,
      ...props
    } = this.props;
    const { open } = this.state;
    const targetElementProps = this.getTargetElementProps(trigger);

    return (
      <div
        className={styles.popover}
        {...props}
      >
        <div
          className={styles.target}
          ref={this.targetRef}
          {...targetElementProps}
        >
          {children}
        </div>
        {open && (
          <div
            className={styles.content}
            ref={this.contentRef}
          >
            {ContentComponent}
          </div>
        )}
      </div>
    );
  };
}

Popover.propTypes = {
  content: PropTypes.object,
  trigger: PropTypes.oneOf(Object.values(TRIGGER_OPTIONS)),
  children: PropTypes.any,
};
