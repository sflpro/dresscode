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
  targetWrapperClassName,
  position = DRAWER_POSITIONS.RIGHT,
  animationDuration,
  style,
  ...props
}) {
  const domBody = useRef(null);
  const [visible, setVisible] = useState(false);

  const [openState, setOpenState] = useState(open);

  const drawerRef = useRef(null);

  const isOpen = onTargetClick && typeof onTargetClick === 'function' ? open : openState;

  const isInHidingProcess = visible && !isOpen;

  const drawerStyles = classNames({
    [styles.drawer]: true,
    [styles[position]]: true,
    [className]: true,
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
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      handleTargetClick(event, false);
    }
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
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
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
              className={drawerStyles}
              style={{
                ...style,
                animationDuration: `${animationDuration}ms`,
              }}
              onClick={handleDrawerClick}
              role='presentation'
              ref={drawerRef}
              {...props}
            >
              {ContentComponent}
            </div>
          ),
          domBody.current,
        )
      )}
    </div>
  );
}

Drawer.propTypes = {
  /** Boolean, whether drawer must be displayed */
  open: PropTypes.bool.isRequired,
  /** String or JSX or Element, drawer content */
  content: PropTypes.any.isRequired,
  /** String or JSX or Element, target element */
  children: PropTypes.any.isRequired,
  /** Function, will be called on target element click */
  onTargetClick: PropTypes.func,
  /** String, className that will be added to drawer element */
  className: PropTypes.string,
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
  onTargetClick: undefined,
  className: '',
  targetWrapperClassName: '',
  position: DRAWER_POSITIONS.RIGHT,
  animationDuration: 500,
  style: undefined,
};
