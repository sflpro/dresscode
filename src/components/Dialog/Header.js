import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './dialog.css';

export class Header extends React.PureComponent {
  headerCancel = () => {
    const { cancel } = this.props;
    if (typeof cancel === 'function') {
      cancel();
    }
  };

  render() {
    const {
      cancel = null,
      className = '',
      children,
      ...props
    } = this.props;

    const titleClasses = classNames({
      [styles.header]: true,
      [className]: true,
    });

    return (
      <div className={titleClasses} {...props}>
        {cancel && (
          <Icon
            name='close'
            size={24}
            className={styles.closeBtn}
            onClick={this.headerCancel}
          />
        )}
        <h2 className={styles.title}>
          {children}
        </h2>
      </div>
    );
  }
}

Header.propTypes = {
  cancel: PropTypes.func,
};
