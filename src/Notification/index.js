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
      className,
      title,
      status,
      type,
      theme,
      icon,
      action,
      children,
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
          {children && (
            <div
              className={styles.message}
            >
              {children}
            </div>
          )}
        </div>
        {action && (
          <span
            className={styles.action}
          >
            {action}
          </span>
        )}
      </div>
    );
  }
}

Notification.propTypes = {
  /** String, className that will be added to wrapper div */
  className: PropTypes.string,
  /** Node, message that will be render */
  children: PropTypes.any,
  /** String, title that will be render */
  title: PropTypes.string,
  /** OneOf, status that will be show one of statuses */
  status: PropTypes.oneOf(['information', 'success', 'warning', 'error']),
  /** OneOf, type of notification */
  type: PropTypes.oneOf(['message', 'alert']),
  /** OneOf, theme for notification type of "alert" */
  theme: PropTypes.oneOf(Object.values(NOTIFICATION_THEMES)),
  /** String, JSX or Element, icon that will be shown on notification popup left side */
  icon: PropTypes.any,
  /** String, JSX or Element, icon that will be show on notification popup top right side */
  action: PropTypes.any,
};

Notification.defaultProps = {
  className: '',
  children: null,
  title: '',
  status: 'information',
  type: 'message',
  theme: 'default',
  icon: undefined,
  action: undefined,
};
