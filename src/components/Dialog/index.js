import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Body } from './Body';
import { Header } from './Header';
import { Actions } from './Actions';

import { PopUp } from '../PopUp';
import { Icon } from '../Icon';

import styles from './dialog.css';

export class Dialog extends React.PureComponent {
  componentDidMount() {
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

  escKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.dismiss();
    }
  };

  render() {
    const {
      children,
      className,
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
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Function, will be called when cross icon or outside of dialog is clicked */
  onDismiss: PropTypes.func,
  /** String or JSX or Element, content of dialog */
  children: PropTypes.any,
};

Dialog.defaultProps = {
  className: '',
  onDismiss: undefined,
  children: null,
};

Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Actions = Actions;
