import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './drawer.css';

export const DRAWER_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};

export function Drawer({
  open,
  children,
  content: ContentComponent,
  onTargetClick,
  className,
  wrapperClassName,
  targetWrapperClassName,
  overlayClassName,
  position = DRAWER_POSITIONS.RIGHT,
  animationDuration,
  ...props
}) {
  const domBody = useRef(null);

  const [visible, setVisible] = useState(false);

  const [openState, setOpenState] = useState(open);

  const isOpen = onTargetClick && typeof onTargetClick === 'function' ? open : openState;

  const isInHidingProcess = visible && !isOpen;

  const drawerClasses = classNames({
    [styles.drawer]: true,
    [styles[position]]: true,
    [className]: true,
    [styles.visible]: !isInHidingProcess,
    [styles.hidden]: isInHidingProcess,
  });

  const overlayClasses = classNames({
    [styles.overlay]: true,
    [overlayClassName]: true,
    [styles.visible]: !isInHidingProcess,
    [styles.hidden]: isInHidingProcess,
  });

  const handleDrawerClick = (event) => {
    event.stopPropagation();
  };

  const handleTargetClick = (event, nextOpen = !isOpen) => {
    event.stopPropagation();
    if (onTargetClick && typeof onTargetClick === 'function') {
      onTargetClick(nextOpen);
    } else {
      setOpenState(nextOpen);
    }
  };

  const handleOutsideClick = (event) => {
    handleTargetClick(event, false);
  };

  useEffect(() => {
    let timer;
    if (!isOpen) {
      if (visible) {
        timer = setTimeout(() => {
          setVisible(false);
        }, animationDuration);
      }
    } else if (!visible) {
      setVisible(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, visible]);

  useEffect(() => {
    domBody.current = document.querySelector('body');
  }, []);

  return (
    <div
      role='presentation'
      onClick={handleTargetClick}
      className={targetWrapperClassName}
    >
      {children}
      {(visible || isOpen) && domBody.current && (
        ReactDOM.createPortal(
          (
            <div
              className={`${styles.drawerWrapper} ${wrapperClassName}`}
              onClick={handleDrawerClick}
              role='presentation'
              {...props}
            >
              <div
                className={overlayClasses}
                onClick={handleOutsideClick}
                style={{
                  animationDuration: `${animationDuration}ms`,
                }}
                role='presentation'
              />
              <div
                style={{
                  animationDuration: `${animationDuration}ms`,
                }}
                className={drawerClasses}
              >
                {ContentComponent}
              </div>
            </div>
          ),
          domBody.current,
        )
      )}
    </div>
  );
}

Drawer.propTypes = {
  /** String or JSX or Element, drawer content */
  content: PropTypes.any.isRequired,
  /** String or JSX or Element, target element */
  children: PropTypes.any.isRequired,
  /** Boolean, whether drawer must be displayed */
  open: PropTypes.bool,
  /** Function, will be called on target element click */
  onTargetClick: PropTypes.func,
  /** String, className that will be added to drawer element */
  className: PropTypes.string,
  /** String, className that will be added to drawer wrapper element */
  wrapperClassName: PropTypes.string,
  /** String, className that will be added to drawer overlay element */
  overlayClassName: PropTypes.string,
  /** String, className that will be added to target wrapper element */
  targetWrapperClassName: PropTypes.string,
  /** String, decides drawer opening side */
  position: PropTypes.oneOf(Object.values(DRAWER_POSITIONS)),
  /** Number, drawer animation duration in milliseconds. */
  animationDuration: PropTypes.number,
  /** Object, style that will be added to drawer element */
  style: PropTypes.object,
};

Drawer.defaultProps = {
  open: false,
  onTargetClick: undefined,
  className: '',
  wrapperClassName: '',
  overlayClassName: '',
  targetWrapperClassName: '',
  position: DRAWER_POSITIONS.RIGHT,
  animationDuration: 500,
  style: undefined,
};
