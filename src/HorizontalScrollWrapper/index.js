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
        [className]: true,
      })}
      style={{ height: `${height}px` }}
      {...props}
    >
      {showLeftArrow && (
        <div
          className={classNames({
            [styles.arrow]: true,
            [overflowIndicatorClassName]: true,
          })}
          onClick={scrollLeft}
          role='presentation'
        >
          {icon}
        </div>
      )}
      <div
        className={classNames({
          [styles.wrapper]: true,
          [childWrapperClassName]: true,
        })}
        onScroll={handleScroll}
        ref={wrapperRef}
      >
        {children}
      </div>
      {showRightArrow ? (
        <div
          className={classNames({
            [styles.arrow]: true,
            [styles.arrowReverse]: true,
            [overflowIndicatorClassName]: true,
          })}
          onClick={scrollRight}
          role='presentation'
        >
          {icon}
        </div>
      ) : (endIcon && showLeftArrow) ? (
        <div
          className={classNames({
            [styles.arrow]: true,
            [styles.endArrow]: true,
            [overflowIndicatorClassName]: true,
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
};

HorizontalScrollWrapper.defaultProps = {
  childWrapperClassName: '',
  overflowIndicatorClassName: '',
  scrollStepWidth: 100,
  className: '',
  scrollPos: 0,
  icon: null,
  endIcon: null,
};
