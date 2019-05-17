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
      open,
      style,
      onDismiss,
      ...props
    } = this.props;

    const dialogClasses = classNames({
      [styles.dialog]: true,
      [className]: true,
    });

    if (!open) {
      return null;
    }

    return (
      <PopUp
        onDismiss={this.dismiss}
        overlay
      >
        <div
          className={dialogClasses}
          style={style}
        >
          <div
            className={styles.container}
            {...props}
          >
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
  /** Boolean, whether dialog is open */
  open: PropTypes.bool.isRequired,
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Function, will be called when cross icon or outside of dialog is clicked */
  onDismiss: PropTypes.func,
  /** String or JSX or Element, content of dialog */
  children: PropTypes.any,
  /** Object, styles that will be added to wrapper div */
  style: PropTypes.any,
};

Dialog.defaultProps = {
  className: '',
  onDismiss: undefined,
  children: null,
  style: undefined,
};

Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Actions = Actions;
