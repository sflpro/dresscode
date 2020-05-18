import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './horizontalScrollWrapper.css';

export function HorizontalScrollWrapper({
  childWrapperClassName,
  scrollStepWidth,
  className,
  scrollPos,
  children,
  icon,
  overflowIndicatorClassName,
  endIcon,
  leftOverflowIndicatorClassName,
  hiddenBlockClassName,
  rightOverflowIndicatorClassName,
  endIconWrapperClassName,
  ...props
}) {
  const [showRightArrow, toggleRightArrow] = useState(false);
  const [showLeftArrow, toggleLeftArrow] = useState(false);
  const [height, setHeight] = useState(0);

  const wrapperRef = React.createRef();

  function checkArrowsState() {
    if (wrapperRef.current) {
      if (wrapperRef.current.scrollLeft !== 0) {
        toggleLeftArrow(true);
      } else if (showLeftArrow) {
        toggleLeftArrow(false);
      }

      if (wrapperRef.current.clientWidth + wrapperRef.current.scrollLeft < wrapperRef.current.scrollWidth) {
        toggleRightArrow(true);
      } else if (showRightArrow) {
        toggleRightArrow(false);
      }
    }
  }

  function handleScroll() {
    checkArrowsState();
  }

  function scrollRight() {
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft += scrollStepWidth;

      if (wrapperRef.current.clientWidth + wrapperRef.current.scrollLeft >= wrapperRef.current.scrollWidth) {
        toggleRightArrow(false);
      }

      if (wrapperRef.current.scrollLeft !== 0) {
        toggleLeftArrow(true);
      }
    }
  }

  function scrollLeft() {
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft -= scrollStepWidth;

      if (wrapperRef.current.clientWidth + wrapperRef.current.scrollLeft < wrapperRef.current.scrollWidth) {
        toggleRightArrow(true);
      }

      if (wrapperRef.current.scrollLeft === 0) {
        toggleLeftArrow(false);
      }
    }
  }

  useEffect(() => {
    let childHeight = 0;

    if (wrapperRef.current) {
      if (wrapperRef.current.firstChild && wrapperRef.current.firstChild.clientHeight) {
        childHeight = wrapperRef.current.firstChild.clientHeight;
      } else {
        childHeight = wrapperRef.current.scrollHeight - wrapperRef.current.offsetHeight;
      }

      setHeight(childHeight);

      checkArrowsState();
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = scrollPos;
    }
  }, [scrollPos]);

  return (
    <div
      className={classNames({
        [styles.main]: true,
        [className]: !!className,
      })}
      {...props}
    >
      {showLeftArrow && (
        <div
          className={classNames({
            [styles.icon]: true,
            [overflowIndicatorClassName]: !!overflowIndicatorClassName,
            [leftOverflowIndicatorClassName]: !!leftOverflowIndicatorClassName,
          })}
          onClick={scrollLeft}
          role='presentation'
        >
          {icon}
        </div>
      )}
      <div
        style={{ height: `${height}px` }}
        className={classNames({
          [styles.hidden]: true,
          [hiddenBlockClassName]: !!hiddenBlockClassName,
        })}
      >
        <div
          className={classNames({
            [styles.wrapper]: true,
            [childWrapperClassName]: !!childWrapperClassName,
          })}
          onScroll={handleScroll}
          ref={wrapperRef}
        >
          {children}
        </div>
      </div>
      {showRightArrow ? (
        <div
          className={classNames({
            [styles.icon]: true,
            [styles.reverseIcon]: true,
            [overflowIndicatorClassName]: !!overflowIndicatorClassName,
            [rightOverflowIndicatorClassName]: !!rightOverflowIndicatorClassName,
          })}
          onClick={scrollRight}
          role='presentation'
        >
          {icon}
        </div>
      ) : (endIcon && showLeftArrow) ? (
        <div
          className={classNames({
            [styles.icon]: true,
            [styles.endIcon]: true,
            [overflowIndicatorClassName]: !!overflowIndicatorClassName,
            [endIconWrapperClassName]: !!endIconWrapperClassName,
          })}
          onClick={scrollRight}
          role='presentation'
        >
          {endIcon}
        </div>
      ) : null}
    </div>
  );
}

HorizontalScrollWrapper.propTypes = {
  /** String, classname that will be passed to gradient div */
  overflowIndicatorClassName: PropTypes.string,
  /** String, classname that will be passed to child wrapper element */
  childWrapperClassName: PropTypes.string,
  /** String, classname that will be passed to wrapper main element */
  className: PropTypes.string,
  /** Number, arrow click scroll step width */
  scrollStepWidth: PropTypes.number,
  /** String or JSX or Element, icon that will scroll right and left */
  icon: PropTypes.any,
  /** String or JSX or Element, initial or externally changed scroll position */
  scrollPos: PropTypes.number,
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** String or JSX or Element, element that will be shown if no right scroll */
  endIcon: PropTypes.any,
  /** String, classname that will be passed to end icon div */
  endIconWrapperClassName: PropTypes.string,
  /** String, classname that will be passed to right gradient div */
  rightOverflowIndicatorClassName: PropTypes.string,
  /** String, classname that will be passed to left gradient div */
  leftOverflowIndicatorClassName: PropTypes.string,
  /** String, classname that will be passed to overflow hidden div */
  hiddenBlockClassName: PropTypes.string,
};

HorizontalScrollWrapper.defaultProps = {
  childWrapperClassName: '',
  overflowIndicatorClassName: '',
  scrollStepWidth: 100,
  className: '',
  scrollPos: 0,
  icon: null,
  endIcon: null,
  endIconWrapperClassName: '',
  rightOverflowIndicatorClassName: '',
  leftOverflowIndicatorClassName: '',
  hiddenBlockClassName: '',
};
