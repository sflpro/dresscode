import React from 'react';
import PropTypes from 'prop-types';

import styles from './positionControl.css';

export class PositionControl extends React.Component {
  popoverRef = React.createRef();
  targetRef = React.createRef();

  state = {
    open: false,
  };

  setPopoverPosition = (targetElementPosition) => {
    const { offsetWidth: popoverWidth, offsetHeight: popoverHeight } = this.popoverRef.current;

    const popoverElementPosition = {
      popoverWidth,
      popoverHeight,
    };

    const [popoverX, popoverY] = this.computePopoverPosition(targetElementPosition, popoverElementPosition);

    this.popoverRef.current.style.top = `${popoverY}px`;
    this.popoverRef.current.style.left = `${popoverX}px`;
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

  handleElementClick = (event) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = event.currentTarget;
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

  render() {
    const {
      popover: PopoverComponent,
      className,
      style,
      children,
      ...props
    } = this.props;
    const { open } = this.state;

    return (
      <div
        className={styles.positionControl}
        {...props}
      >
        <div
          className={styles.target}
          ref={this.targetRef}
        >
          {children(this.handleElementClick)}
        </div>
        {open && (
          <div
            className={styles.popover}
            ref={this.popoverRef}
          >
            {PopoverComponent}
          </div>
        )}
      </div>
    );
  }
}

Element.propTypes = {
  value: PropTypes.string,
  popover: PropTypes.func,
  children: PropTypes.any,
};
