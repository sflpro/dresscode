import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './notification.css';

const NOTIFICATION_THEMES = {
  DEFAULT: 'default',
  LIGHT: 'light',
  DARK: 'dark',
};

export class Notification extends React.PureComponent {
  render() {
    const {
      message,
      className,
      title,
      status,
      type,
      theme,
      icon,
      ...props
    } = this.props;

    const notificationClasses = classNames({
      [styles.notification]: true,
      [styles[`notification-${type}`]]: true,
      [styles[`theme-${theme}`]]: true,
      [styles[status]]: true,
      [className]: true,
    });

    return (
      <div
        className={notificationClasses}
        {...props}
      >
        {icon && (
          <span
            className={styles.icon}
          >
            {icon}
          </span>
        )}
        <div
          className={styles.content}
        >
          {title && (
            <span
              className={styles.title}
            >
              {title}
            </span>
          )}
          {message && (
            <div
              className={styles.message}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  title: PropTypes.string,
  status: PropTypes.oneOf(['information', 'success', 'warning', 'error']),
  type: PropTypes.oneOf(['message', 'alert']),
  theme: PropTypes.oneOf(Object.values(NOTIFICATION_THEMES)),
  icon: PropTypes.any,
};

Notification.defaultProps = {
  className: '',
  message: null,
  title: '',
  status: 'information',
  type: 'message',
  theme: 'default',
  icon: null,
};
