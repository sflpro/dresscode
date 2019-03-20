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
    this.domBody.style.overflow = this.domBodyOverflow || null;
    document.removeEventListener('keydown', this.escKeyDown, false);
  }

  escKeyDown = event => {
    if (event.keyCode === 27) {
      this.dismiss();
    }
  };

  dismiss = () => {
    const { onDismiss } = this.props;
    if (typeof onDismiss === 'function') {
      document.removeEventListener('keydown', this.escKeyDown, false);
      onDismiss();
    }
  };

  render() {
    const {
      children,
      className = '',
      onDismiss = null,
      ...props
    } = this.props;

    const dialogClasses = classNames({
      [styles.dialog]: true,
      [className]: true,
    });

    return (
      <PopUp overlay onDismiss={this.dismiss}>
        <div
          className={dialogClasses}
        >

          <div className={styles.container} {...props}>
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
