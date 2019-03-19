import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PopUp } from '../PopUp';

import styles from './dialog.css';

export class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.domBody = document.querySelector('body');
    this.domBodyOverflow = this.domBody.style.overflow;
    this.domBody.style.overflow = 'hidden';
    document.addEventListener('keydown', this.escKeyDown, false);
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
    const { onDismiss } = this.props;
    this.domBody.style.overflow = null;
    document.removeEventListener('keydown', this.escKeyDown, false);
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  };

  render() {
    const {
      children,
      className = '',
    } = this.props;

    let open = true;

    const dialogClasses = classNames({
      [styles.dialog]: true,
      [className]: true,
    });

    return (
      <PopUp overlay onDismiss={this.dismiss}>
        <div
          className={dialogClasses}
        >

          <div className={styles.container}>
            {children}
          </div>
        </div>
      </PopUp>
    );
  }
}

Wrapper.propTypes = {
  className: PropTypes.string,
  onDismiss: PropTypes.func,
};
