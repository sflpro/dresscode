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
  position = DRAWER_POSITIONS.RIGHT,
  animationDuration,
  style,
  ...props
}) {
  const domBody = document.querySelector('body');

  const [visible, setVisible] = useState(false);

  const drawerRef = useRef(null);

  const isInHidingProcess = visible && !open;

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

  const handleTargetClick = (event) => {
    event.stopPropagation();
    onTargetClick(!open);
  };

  const handleOutsideClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      event.stopPropagation();
      onTargetClick(false);
    }
  };

  useEffect(() => {
    let timer;
    if (!open) {
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
  }, [open, visible]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  return (
    <div
      role='presentation'
      onClick={handleTargetClick}
    >
      {children}
      {(visible || open) && (
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
          domBody,
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
  /** Function, will be called on target element click */
  onTargetClick: PropTypes.func.isRequired,
  /** String or JSX or Element, target element */
  children: PropTypes.any.isRequired,
  /** String, className that will be added to drawer element */
  className: PropTypes.string,
  /** String, decides drawer opening side */
  position: PropTypes.oneOf(Object.values(DRAWER_POSITIONS)),
  /** Number, drawer animation duration in milliseconds. */
  animationDuration: PropTypes.number,
  /** Object, style that will be added to drawer element */
  style: PropTypes.object,
};

Drawer.defaultProps = {
  className: '',
  position: DRAWER_POSITIONS.RIGHT,
  animationDuration: 500,
  style: undefined,
};
