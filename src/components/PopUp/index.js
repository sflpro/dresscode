import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import styles from './popUp.css';

export class PopUp extends React.Component {
  constructor(props) {
    super(props);
    const { overlay } = this.props;
    this.domBody = document.querySelector('body');
    this.domBodyOverflow = this.domBody.style.overflow;
    if (overlay) {
      this.domBody.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    this.domBody.style.overflow = this.domBodyOverflow || null;
  }

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
        {overlay && (
          <div
            className={styles.overlay}
            onClick={this.onDismiss}
            role='presentation'
          />
        )}
        {children}
      </div>
    );

    return ReactDOM.createPortal(
      renderChild,
      this.domBody,
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
  children: PropTypes.any,
};

PopUp.defaultProps = {
  className: '',
  onDismiss: null,
  overlay: false,
  position: '',
  children: null,
};
