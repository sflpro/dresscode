import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './dialog.css';

export class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.domBody = document.querySelector('body');
    this.domBodyOverflow = this.domBody.style.overflow;
    const { open } = this.props;
    if (open) {
      this.domBody.style.overflow = 'hidden';
      document.addEventListener('keydown', this.escKeyDown, false);
    }
  }

  componentDidUpdate() {
    const { open } = this.props;
    if (open) {
      document.addEventListener('keydown', this.escKeyDown, false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escKeyDown, false);
  }

  escKeyDown = event => {
    if (event.keyCode === 27) {
      this.dismiss();
    }
  };

  showHideModal = (toggleParam) => {
    this.domBody.style.overflow = toggleParam ? 'hidden' : this.domBodyOverflow;
  };

  dismiss = () => {
    const { dismiss } = this.props;
    this.domBody.style.overflow = null;
    document.removeEventListener('keydown', this.escKeyDown, false);
    if (typeof dismiss === 'function') {
      dismiss();
    }
  };

  render() {
    const {
      children,
      dismiss = null,
      className = '',
      open = false,
    } = this.props;
    this.showHideModal(open);

    const dialogClasses = classNames({
      [styles.dialog]: true,
      [className]: true,
    });

    const renderChild = (
      <div
        className={dialogClasses}
      >
        {dismiss && (<div className={styles.overlay} onClick={this.dismiss} />)}
        <div className={styles.container}>
          {children}
        </div>
      </div>
    );


    return open ? ReactDOM.createPortal(
      renderChild,
      document.querySelector('body'),
    ) : null;
  }
}

Wrapper.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  dismiss: PropTypes.func,
};
