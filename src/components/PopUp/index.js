import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import styles from './popUp.css';

export class PopUp extends React.Component {

  onDismiss = () => {
    const { onDismiss } = this.props;
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  };

  render() {
    const {
      children,
      className = '',
      position = '',
      overlay = false,
      onDismiss = null,
      ...props
    } = this.props;


    const popUpClasses = classNames({
      [styles.popUp]: true,
      [className]: true,
      [styles[position]]: !!position,
    });

    const renderChild = (
      <div
        className={popUpClasses}
        {...props}
      >
        {overlay && (<div className={styles.overlay} onClick={this.onDismiss} />)}
        {children}
      </div>
    );


    return ReactDOM.createPortal(
      renderChild,
      document.querySelector('body'),
    );
  }
}

PopUp.propTypes = {
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  overlay: PropTypes.bool,
  position: PropTypes.oneOf([
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
  ]),
};
