import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './popover.css';

export const POPOVER_TRIGGER_OPTIONS = {
  CLICK: 'click',
  HOVER: 'hover',
};

export class Popover extends React.Component {
  constructor(props) {
    super(props);

    const { trigger } = this.props;

    this.contentRef = React.createRef();
    this.targetRef = React.createRef();
    this.arrowRef = React.createRef();

    this.targetElementProps = this.getTargetElementProps(trigger);
  }

  componentDidMount() {
    const { open } = this.props;
    if (open) {
      this.setPopoverPosition(this.targetElementPosition);
    }
    document.addEventListener('scroll', this.handleMouseLeave);
  }

  componentDidUpdate(prevProps) {
    const { open: prevOpen } = prevProps;
    const { open } = this.props;
    if (open !== prevOpen && open) {
      this.setPopoverPosition(this.targetElementPosition);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleMouseLeave);
    document.removeEventListener('mousedown', this.handleClickLeave);
  }

  setPopoverPosition = (targetElementPosition) => {
    const { offsetWidth: popoverWidth, offsetHeight: popoverHeight } = this.contentRef.current;

    const popoverElementPosition = {
      popoverWidth,
      popoverHeight,
    };

    const { popover, arrow } = this.computePopoverPosition(targetElementPosition, popoverElementPosition);
    const { x: popoverX, y: popoverY, position: popoverPosition } = popover;
    const { x: arrowX, y: arrowY, position: arrowPosition, classes: arrowClasses } = arrow;

    this.contentRef.current.style[popoverY.position] = `${popoverY.y}px`;
    this.contentRef.current.style[popoverX.position] = `${popoverX.x}px`;
    if (popoverPosition) {
      this.contentRef.current.style.position = popoverPosition;
    }

    if (this.arrowRef.current) {
      this.arrowRef.current.style[arrowY.position] = `${arrowY.y}px`;
      this.arrowRef.current.style[arrowX.position] = `${arrowX.x}px`;
      if (arrowPosition) {
        this.arrowRef.current.style.position = arrowPosition;
      }
      if (arrowClasses) {
        this.arrowRef.current.classList.add(arrowClasses);
      }
    }
  };

  getElementOffset = (el, considerScroll = true) => {
    const rect = el.getBoundingClientRect();
    let scrollLeft = 0;
    let scrollTop = 0;

    if (considerScroll) {
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }

    return {
      offsetTop: rect.top + scrollTop,
      offsetLeft: rect.left + scrollLeft,
      offsetWidth: rect.width,
      offsetHeight: rect.height,
    };
  };

  computeHorizontalPosition = (targetElementPosition, popoverElementPosition, contentRelative = false) => {
    let arrowWidth = 0;
    let positionX = 'left';
    if (this.arrowRef.current) {
      arrowWidth = this.arrowRef.current.offsetWidth;
    }

    const { width, coordinates: { x: pLeft } } = targetElementPosition;
    const { popoverWidth } = popoverElementPosition;

    let popoverX;
    if (contentRelative) {
      popoverX = pLeft;
    } else {
      popoverX = pLeft - ((popoverWidth - width) / 2);
    }
   
    const arrowX = pLeft - ((arrowWidth - width) / 2);

    if (popoverWidth + popoverX > window.innerWidth) {
      popoverX = 0;
      positionX = 'right';
    }
    popoverX = Math.max(popoverX, 0);

    return {
      popoverX: {
        position: positionX,
        x: popoverX,
      },
      arrowX: {
        position: 'left',
        x: arrowX,
      },
    };
  };

  computeVerticalPosition = (targetElementPosition, popoverElementPosition) => {
    const { follow, gap = 0, position = 'bottom' } = this.props;
    let arrowHeight = 0;
    if (this.arrowRef.current) {
      arrowHeight = this.arrowRef.current.offsetHeight;
    }

    const { height, coordinates: { y: pTop } } = targetElementPosition;
    const { popoverHeight } = popoverElementPosition;

    let arrowY;
    let popoverY;
    let arrowClasses = '';
    if (position === 'bottom') {
      arrowY = pTop + height + gap + 1;
      popoverY = arrowY + arrowHeight;
      if (window.innerHeight - popoverY < popoverHeight && (pTop - arrowHeight + gap - popoverHeight > 0)) {
        arrowY = pTop - (arrowHeight + gap) - 1;
        popoverY = arrowY - popoverHeight + 1;
        if (!follow) {
          arrowClasses = styles.arrowY;
        }
      }
    } else {
      arrowY = pTop - (arrowHeight + gap) - 1;
      popoverY = arrowY - popoverHeight + 1;
      if (popoverY < 0) {
        arrowY = pTop + height + gap + 1;
        popoverY = arrowY + arrowHeight;
      } else {
        if (!follow) {
          arrowClasses = styles.arrowTop;
        }
      }
    }

    return {
      popoverY: {
        position: 'top',
        y: popoverY,
      },
      arrowY: {
        position: 'top',
        y: arrowY,
      },
      arrowClasses
    };
  };

  computePopoverPosition = (targetElementPosition, popoverElementPosition) => {
    const { follow, contentRelative } = this.props;

    let popoverPosition;
    let arrowPosition;

    if (follow) {
      popoverPosition = arrowPosition = 'fixed';
    }

    const { popoverX, arrowX } = this.computeHorizontalPosition(targetElementPosition, popoverElementPosition, contentRelative);
    const { popoverY, arrowY, arrowClasses } = this.computeVerticalPosition(targetElementPosition, popoverElementPosition);

    const popover = {
      x: popoverX,
      y: popoverY,
      position: popoverPosition,
    };

    const arrow = {
      x: arrowX,
      y: arrowY,
      position: arrowPosition,
      classes: arrowClasses,
    };

    return {
      popover,
      arrow,
    };
  };

  handleClick = (event) => {
    this.handleMouseEnter(event);
    document.addEventListener('mousedown', this.handleClickLeave);
  };

  handleClickLeave = (event) => {
    this.handleMouseLeave(event);
    document.removeEventListener('mousedown', this.handleClickLeave);
  };

  handleMouseEnter = (event) => {
    const { follow = false, open, trigger = POPOVER_TRIGGER_OPTIONS.CLICK, onTargetEvent } = this.props;
    const target = trigger === POPOVER_TRIGGER_OPTIONS.HOVER ? event.target : event.currentTarget;
    let { offsetWidth, offsetHeight, offsetLeft, offsetTop } = this.getElementOffset(target, false);

    if (follow) {
      offsetLeft = event.clientX;
      offsetTop = event.clientY;
      offsetWidth = 0;
      offsetHeight = 0;
    }

    this.targetElementPosition = {
      width: offsetWidth,
      height: offsetHeight,
      coordinates: {
        x: offsetLeft,
        y: offsetTop,
      },
    };

    if (!follow || (follow && !open)) {
      onTargetEvent(!open);
    } else {
      this.setPopoverPosition(this.targetElementPosition);
    }
  };

  handleMouseLeave = (event) => {
    const { onTargetEvent } = this.props;
    onTargetEvent(false);
    document.removeEventListener('scroll', this.handleMouseLeave);
  };

  getTargetElementProps = (trigger) => {
    const { follow } = this.props;
    const targetElementProps = {};
    if (trigger === POPOVER_TRIGGER_OPTIONS.CLICK) {
      targetElementProps.onClick = this.handleClick;
    } else if (trigger === POPOVER_TRIGGER_OPTIONS.HOVER) {
      targetElementProps.onMouseEnter = this.handleMouseEnter;
      targetElementProps.onMouseLeave = this.handleMouseLeave;
    }

    if (follow) {
      targetElementProps.onMouseMove = this.handleMouseEnter;
      targetElementProps.onMouseLeave = this.handleMouseLeave;
    }

    return targetElementProps;
  };

  render() {
    const {
      content: ContentComponent,
      trigger = POPOVER_TRIGGER_OPTIONS.CLICK,
      arrow = false,
      position = 'bottom',
      follow = false,
      open = false,
      className = '',
      onTargetEvent,
      style,
      children,
      ...props
    } = this.props;

    const popoverStyles = classNames({
      [styles.popover]: true,
      [className]: true,
    })
    return (
      <div
        className={popoverStyles}
        {...props}
      >
        <div
          className={styles.target}
          ref={this.targetRef}
          {...this.targetElementProps}
        >
          {children}
        </div>
        {open && (
          <React.Fragment>
            {arrow && !follow && (
              <span
                ref={this.arrowRef}
                className={styles.arrow}
              />
            )}
            <div
              className={styles.content}
              ref={this.contentRef}
            >
              {ContentComponent}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  };
}

Popover.propTypes = {
  onTargetEvent: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']),
  arrow: PropTypes.bool,
  follow: PropTypes.bool,
  gap: PropTypes.number,
  content: PropTypes.object,
  contentRelative: PropTypes.bool,
  open: PropTypes.bool,
  trigger: PropTypes.oneOf(Object.values(POPOVER_TRIGGER_OPTIONS)),
  children: PropTypes.any,
};
