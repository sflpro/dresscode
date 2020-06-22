import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import styles from './popUp.css';

export class PopUp extends React.Component {
  constructor(props) {
    super(props);
    const { overlay } = this.props;

    this.domBody = document.body;
    this.domBodyOverflow = this.domBody.style.overflow;

    if (overlay) {
      this.domBody.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    this.domBody.style.overflow = this.domBodyOverflow || '';
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
      className,
      position,
      overlay,
      onDismiss,
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
  /** String, className that is added to wrapper div */
  className: PropTypes.string,
  /** Function, called when overlay is clicked */
  onDismiss: PropTypes.func,
  /** Boolean, whether popup has overlay */
  overlay: PropTypes.bool,
  /** String, position of popup */
  position: PropTypes.oneOf([
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    '',
  ]),
  /** Object, style that will be added to wrapper div */
  style: PropTypes.object,
  /** String or JSX or Element, position of popup */
  children: PropTypes.any,
};

PopUp.defaultProps = {
  className: '',
  onDismiss: null,
  overlay: false,
  position: '',
  style: undefined,
  children: null,
};
