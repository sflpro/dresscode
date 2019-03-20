import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PopUp } from '../PopUp';
import { Body } from './Body';
import { Header } from './Header';
import { Actions } from './Actions';

import styles from './dialog.css';
import { Icon } from '../Icon';

export class Dialog extends React.PureComponent {
  constructor(props) {
    super(props);
    document.addEventListener('keydown', this.escKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escKeyDown, false);
  }

  dismiss = () => {
    const { onDismiss } = this.props;
    if (typeof onDismiss === 'function') {
      document.removeEventListener('keydown', this.escKeyDown, false);
      onDismiss();
    }
  };

  escKeyDown = event => {
    if (event.keyCode === 27) {
      this.dismiss();
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
            <Icon
              name='cross'
              size={24}
              className={styles.closeBtn}
              onClick={this.dismiss}
            />
            {children}
          </div>
        </div>
      </PopUp>
    );
  }
}

Dialog.propTypes = {
  className: PropTypes.string,
  onDismiss: PropTypes.func,
};


Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Actions = Actions;
