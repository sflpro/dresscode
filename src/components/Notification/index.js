import React from 'react';
import ReactDOM from 'react-dom';

import styles from './notification.css';

class NotificationStack {
  static instance;

  static notifications = {};


  static notificationNextIndex = 0;

  static container = null;

  static domWrapper = null;

  static domChild = null;

  constructor() {
    if (NotificationStack.instance) {
      return NotificationStack.instance;
    }
    NotificationStack.instance = this;
  }

  static getDomElem = () => {

    if (Object.keys(NotificationStack.notifications).length > 0) {

      NotificationStack.domChild = true;
      NotificationStack.domWrapper = document.querySelector('.notification-list');
    } else {

      NotificationStack.domChild = null;
      NotificationStack.domWrapper = document.querySelector('body');
    }
  };

  static setContainer = () => {
    if (!NotificationStack.container && !NotificationStack.domChild) {
      NotificationStack.container = <NotificationContainer />;
    }
  };

  setStack = (value, duration = 5) => {
    const index = NotificationStack.notificationNextIndex;
    const notification = {
      duration: duration * 1000,
      value,
    };
    NotificationStack.notifications[index] = notification;
    NotificationStack.notificationNextIndex = index + 1;
    return { notification, index };
  };

  removeStackItem = (index) => {
    delete NotificationStack.notifications[index];
  };
}

const NotificationContainer = () => {
  const domChild = !NotificationStack.domChild ? (
      <div className={`${styles['notification-list']} notification-list`}>
        {children}
      </div>
  ) : children || null;

  return ReactDOM.createPortal(
      domChild,
      children,
  );
};

export class Notification extends React.Component {
  nItems = {};

  removeTimeout = {};

  constructor(props) {
    super(props);
    this.state = {
      nItem: this.nItems,
    };
    this.getDomElem();
    this.domChild = NotificationStack.domChild;
    NotificationStack.setContainer();
    this.notificationStack = new NotificationStack();
    this.addNewNotification();
  }

  componentDidUpdate(prevProps) {
    const { children: prevChildren } = prevProps;
    const { children } = this.props;
    if (children !== prevChildren) {
      this.setState({ ...this.state, nItems: this.nItems });
      this.addNewNotification();
    }
  }

  componentWillUnmount() {
    Object.entries(this.nItems).map(([key]) => {
      this.notificationStack.removeStackItem(key);
      clearTimeout(this.removeTimeout[key]);
    });
  }

  getDomElem = () => {
    if (!NotificationStack.domWrapper || !this.domChild) {
      this.domChild = null;
      NotificationStack.getDomElem();
    }
    this.domWrapper = NotificationStack.domWrapper;
    this.container = NotificationStack.container;
  };

  removeFromDuration = (index) => {
    this.removeTimeout[index] = setTimeout(() => {
      this.notificationStack.removeStackItem(index);
      delete this.nItems[index];
      this.setState({ ...this.state, nItems: this.nItems });
      clearTimeout(this.removeTimeout[index]);
    }, this.nItems[index].duration);
  };

  addNewNotification = () => {
    const { children } = this.props;
    const { notification, index } = this.notificationStack.setStack(children, 10);
    this.nItems[index] = notification;
    this.removeFromDuration(index);
  };

  setNotificationItems = () => {
    this.notificationItems = Object.entries(this.nItems).map(([key, item]) => (
      <div
        className={styles.notificationItem}
        key={key}
      >
          {item.value}
        </div>
    ));
  };

  render() {
    this.setNotificationItems();
    this.getDomElem();

    if (this.container && this.domChild && this.domWrapper) {
      return ReactDOM.createPortal(
        this.notificationItems,
        this.domWrapper,
      );
    } else {
      return ReactDOM.createPortal(
        (<div className={`${styles['notification-list']} notification-list`}>
          {this.notificationItems}
        </div>),
        document.querySelector('body'),
      );
    }
  }
}
