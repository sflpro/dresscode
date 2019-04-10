import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './notificationFrame.css';

const NOTIFICATION_THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const ICON_TYPE = {
  information: 'transaction',
  success: 'check',
  warning: 'warning',
  error: 'cross-circle'
};

export class NotificationFrame extends React.PureComponent {
  render() {
    const {
      dismiss = false,
      message = '',
      className = '',
      title = '',
      status = 'information',
      type = 'message',
      theme = 'default',
      ...props
    } = this.props;

    const notificationClasses = classNames({
      [styles.notificationFrame]: true,
      [styles[`notificationFrame-${type}`]]: true,
      [styles[`theme-${theme}`]]: true,
      [styles[status]]: true,
      [className]: true
    });

    return (
      <div className={notificationClasses} {...props}>
        {ICON_TYPE[status] && <Icon name={ICON_TYPE[status]} className={styles['type-icon']} size={24} />}
        <div className={styles.content}>
          {title && <span className={styles.title}>{title}</span>}
          {message && <div className={styles.message}>{message}</div>}
        </div>

        {dismiss && <Icon name='cross' className={styles.closeBtn} size={24} />}
      </div>
    );
  }
}

Notification.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  title: PropTypes.string,
  dismiss: PropTypes.bool,
  status: PropTypes.oneOf(['information', 'success', 'warning', 'error']),
  type: PropTypes.oneOf(['message', 'alert']),
  theme: PropTypes.oneOf(Object.values(NOTIFICATION_THEMES))
};
