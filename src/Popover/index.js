import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';

import styles from './popover.css';

export const POPOVER_TRIGGER_OPTIONS = {
  CLICK: 'click',
  HOVER: 'hover',
};

export const POPOVER_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

export class Popover extends React.Component {
  constructor(props) {
    super(props);

    const { trigger, children } = this.props;

    this.contentRef = React.createRef();
    this.targetRef = React.createRef();
    this.arrowRef = React.createRef();

    this.targetElementPosition = {
      coordinates: {},
    };
    this.targetElementProps = {};

    if (typeof children !== 'function') {
      this.targetElementProps = this.getTargetElementProps(trigger);
    }
  }

  componentDidMount() {
    const { open, watchTargetDimensions } = this.props;

    if (open) {
      this.setPopoverPosition(this.targetElementPosition);
    }

    if (watchTargetDimensions && this.targetRef.current) {
      this.observer = new ResizeObserver(() => {
        if (this.contentRef.current) {
          const {
            offsetWidth,
            offsetHeight,
            offsetLeft,
            offsetTop,
          } = this.getElementOffset(this.targetRef.current, false);

          this.targetElementPosition = {
            width: offsetWidth,
            height: offsetHeight,
            coordinates: {
              x: offsetLeft,
              y: offsetTop,
            },
          };

          this.setPopoverPosition(this.targetElementPosition);
        }
      });

      this.observer.observe(this.targetRef.current);
    }

    if (open) {
      document.addEventListener('scroll', this.handleMouseLeave);
    }
  }

  componentDidUpdate(prevProps) {
    const { open: prevOpen } = prevProps;
    const { open } = this.props;

    if (!prevOpen && open) {
      this.setPopoverPosition(this.targetElementPosition);
      this.contentRef.current.addEventListener('mousedown', this.handleContentClick);
    } else if (!open && prevOpen) {
      document.removeEventListener('click', this.handleClickLeave, true);
    }
  }

  componentWillUnmount() {
    if (this.observer && this.targetRef.current) {
      this.observer.unobserve(this.targetRef.current);
    }

    document.removeEventListener('click', this.handleClickLeave, true);
    document.removeEventListener('scroll', this.handleMouseLeave);
  }

  setPopoverPosition = (targetElementPosition) => {
    const { offsetWidth: popoverWidth, offsetHeight: popoverHeight } = this.contentRef.current;
    const { contentEqualToTarget, follow, gap } = this.props;

    const popoverElementPosition = {
      popoverWidth,
      popoverHeight,
    };

    const { popover, arrow } = this.computePopoverPosition(targetElementPosition, popoverElementPosition);
    const { x: popoverX, y: popoverY, position: popoverPosition } = popover;
    const { x: arrowX, y: arrowY, position: arrowPosition, classes: arrowClasses } = arrow;

    this.contentRef.current.style[popoverY.position] = `${follow ? popoverY.y - gap : popoverY.y}px`;
    this.contentRef.current.style[popoverX.position] = `${popoverX.x}px`;
    this.contentRef.current.style[popoverX.resetPosition] = 'auto';
    this.contentRef.current.style[popoverY.resetPosition] = 'auto';

    if (popoverPosition) {
      this.contentRef.current.style.position = popoverPosition;
    }

    if (contentEqualToTarget) {
      this.contentRef.current.style.width = `${this.targetRef.current.clientWidth}px`;
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
    let arrowGap = 0;
    let resetPositionX = 'right';
    let setPositionX = 'left';

    if (this.arrowRef.current) {
      const { offsetWidth, offsetHeight: rotatedWidth } = this.arrowRef.current;

      arrowWidth = rotatedWidth;
      arrowGap = (offsetWidth - rotatedWidth) / 2;
    }

    const { width, coordinates: { x: pLeft } } = targetElementPosition;
    const { popoverWidth } = popoverElementPosition;
    const { follow, gap, position } = this.props;
    let arrowX;
    let popoverX;
    let arrowClasses = '';
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const windowWidth = document.body.clientWidth - scrollLeft;

    if (position === POPOVER_POSITIONS.RIGHT) {
      arrowX = pLeft + width + gap + 1;
      popoverX = arrowX + arrowWidth + arrowGap;
      arrowClasses = styles.arrowLeft;
      if (
        windowWidth - popoverX < popoverWidth
        && (pLeft - arrowWidth + gap - popoverWidth > 0)
      ) {
        arrowX = pLeft - (arrowWidth + gap) - 1;
        popoverX = arrowX - popoverWidth + arrowGap;

        if (!follow) {
          arrowClasses = styles.arrowRight;
        }
      }
    } else if (position === POPOVER_POSITIONS.LEFT) {
      arrowX = pLeft - (arrowWidth + gap) - 1;
      popoverX = arrowX - popoverWidth + arrowGap;
      arrowClasses = styles.arrowLeft;

      if (popoverX < 0) {
        arrowX = pLeft + width + gap + 1;
        popoverX = arrowX + arrowWidth + arrowGap;
      } else if (!follow) {
        arrowClasses = styles.arrowRight;
      }
    } else {
      if (contentRelative) {
        popoverX = pLeft;
      } else {
        popoverX = pLeft - ((popoverWidth - width) / 2);
      }

      arrowX = pLeft - ((arrowWidth - width) / 2);

      if (popoverWidth + popoverX > windowWidth) {
        popoverX = 0;
        setPositionX = 'right';
        resetPositionX = 'left';
      }

      const rightOffset = windowWidth - pLeft - width;

      if (rightOffset + width < popoverWidth && rightOffset < pLeft) {
        popoverX = rightOffset;
        setPositionX = 'right';
        resetPositionX = 'left';
      }

      popoverX = Math.max(popoverX, 0);
    }

    return {
      popoverX: {
        resetPosition: resetPositionX,
        position: setPositionX,
        x: popoverX,
      },
      arrowX: {
        position: 'left',
        x: arrowX,
      },
      arrowClasses,
    };
  };

  computeVerticalPosition = (targetElementPosition, popoverElementPosition, contentRelative = false) => {
    const { follow, gap, position } = this.props;
    let resetPositionY = 'bottom';
    let setPositionY = 'top';
    let arrowHeight = 0;

    if (this.arrowRef.current) {
      arrowHeight = this.arrowRef.current.offsetHeight;
    }

    const { height, coordinates: { y: pTop } } = targetElementPosition;
    const { popoverHeight } = popoverElementPosition;

    let arrowY;
    let popoverY;
    let arrowClasses = '';
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = document.body.clientHeight - scrollTop;

    if (position === POPOVER_POSITIONS.BOTTOM) {
      arrowY = pTop + height + gap + 1;
      popoverY = arrowY + arrowHeight;

      if (
        windowHeight - popoverY < popoverHeight
        && (pTop - arrowHeight + gap - popoverHeight > 0)
      ) {
        resetPositionY = 'top';
        setPositionY = 'bottom';

        arrowY = pTop - (arrowHeight + gap) - 1;
        popoverY = windowHeight - pTop + gap;

        if (!follow) {
          arrowClasses = styles.arrowTop;
        }
      }
    } else if (position === POPOVER_POSITIONS.TOP) {
      arrowY = pTop - (arrowHeight + gap) - 1;
      popoverY = arrowY - popoverHeight + 1;

      if (popoverY < 0) {
        arrowY = pTop + height + gap + 1;
        popoverY = arrowY + arrowHeight;
      } else if (!follow) {
        arrowClasses = styles.arrowTop;
      }
    } else {
      if (contentRelative) {
        popoverY = pTop;
      } else {
        popoverY = pTop - ((popoverHeight - height) / 2);
      }
      arrowY = pTop - ((arrowHeight - height) / 2);
    }

    return {
      popoverY: {
        resetPosition: resetPositionY,
        position: setPositionY,
        y: popoverY,
      },
      arrowY: {
        position: POPOVER_POSITIONS.TOP,
        y: arrowY,
      },
      arrowClasses,
    };
  };

  computePopoverPosition = (targetElementPosition, popoverElementPosition) => {
    const { follow, contentRelative } = this.props;

    let popoverPosition;
    let arrowPosition;

    if (follow) {
      popoverPosition = 'fixed';
      arrowPosition = 'fixed';
    }

    const {
      popoverX,
      arrowX,
      arrowClasses: horizontalArrowClasses,
    } = this.computeHorizontalPosition(targetElementPosition, popoverElementPosition, contentRelative);
    const {
      popoverY,
      arrowY,
      arrowClasses: verticalArrowClasses,
    } = this.computeVerticalPosition(targetElementPosition, popoverElementPosition, contentRelative);
    const arrowClasses = horizontalArrowClasses || verticalArrowClasses;
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
    document.addEventListener('click', this.handleClickLeave, true);
  };

  handleClickLeave = (event) => {
    if (!(this.contentRef.current && this.contentRef.current.contains(event.target))) {
      event.stopPropagation();
      this.handleMouseLeave(event);
      document.removeEventListener('click', this.handleClickLeave, true);
    }
  };

  handleMouseEnter = (event) => {
    const {
      follow,
      open,
      onTargetEvent,
      contentRelative,
    } = this.props;
    let target = event.currentTarget;
    if (contentRelative) {
      target = this.targetRef.current;
    }

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

    if (!(follow && open)) {
      if (!open) {
        document.addEventListener('scroll', this.handleMouseLeave);
      }

      onTargetEvent(!open);
    } else {
      this.setPopoverPosition(this.targetElementPosition);
    }
  };

  handleMouseLeave = () => {
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

  handlePopoverClick = event => (
    event.preventDefault()
  );

  handleContentClick = event => (
    event.stopPropagation()
  );

  render() {
    const {
      content: ContentComponent,
      contentEqualToTarget,
      watchTargetDimensions,
      trigger,
      arrow,
      position,
      follow,
      open,
      className,
      onTargetEvent,
      contentRelative,
      children,
      gap,
      ...props
    } = this.props;

    const popoverStyles = classNames({
      [styles.popover]: true,
      [className]: true,
    });

    return (
      <div
        className={popoverStyles}
        onClick={this.handlePopoverClick}
        role='presentation'
        {...props}
      >
        <div
          className={styles.target}
          ref={this.targetRef}
          {...this.targetElementProps}
        >
          {typeof children === 'function' ? children({
            setOnClick: this.handleClick,
            setOnMouseEnter: this.handleMouseEnter,
            setOnMouseLeave: this.handleMouseLeave,
          }) : children}
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
  }
}

Popover.propTypes = {
  /** Function, will be called when mouse leave from target element and if clicked outside */
  onTargetEvent: PropTypes.func.isRequired,
  /** String or JSX or Element, content of popover */
  content: PropTypes.any.isRequired,
  /** String, position of popover related to target */
  position: PropTypes.oneOf(Object.values(POPOVER_POSITIONS)),
  /** Boolean, whether popover has arrow */
  arrow: PropTypes.bool,
  /** Boolean, whether popover must move with mouse */
  follow: PropTypes.bool,
  /** Number, distance between arrow(popover) and target */
  gap: PropTypes.number,
  /** Boolean, popover is opened from left of target if this prop is true else from center */
  contentRelative: PropTypes.bool,
  /** Boolean, whether popover must be displayed */
  open: PropTypes.bool,
  /** String, what action triggers popover to be displayed(click or hover) */
  trigger: PropTypes.oneOf(Object.values(POPOVER_TRIGGER_OPTIONS)),
  /** String, className that is added to wrapper div */
  className: PropTypes.string,
  /** Object, styles that is added to wrapper div */
  style: PropTypes.object,
  /** Element or function, target element of popup or function that renders target element */
  children: PropTypes.any,
  /** boolean, whether content width is equal to target width */
  contentEqualToTarget: PropTypes.bool,
  /** boolean, whether to update content positions on target height/width change */
  watchTargetDimensions: PropTypes.bool,
};

Popover.defaultProps = {
  position: POPOVER_POSITIONS.BOTTOM,
  arrow: false,
  follow: false,
  gap: 0,
  contentRelative: false,
  open: false,
  trigger: POPOVER_TRIGGER_OPTIONS.CLICK,
  className: '',
  style: undefined,
  children: null,
  contentEqualToTarget: false,
  watchTargetDimensions: false,
};
