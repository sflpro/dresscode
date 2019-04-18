import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './notificationStack.css';

class Stack {
  static instance;

  static notifications = {};

  static notificationNextIndex = 0;

  static container = null;

  static domWrapper = null;

  static domChild = null;

  constructor() {
    if (Stack.instance) {
      return Stack.instance;
    }
    Stack.instance = this;
  }

  static getDomElem = () => {
    if (Object.keys(Stack.notifications).length > 0) {
      Stack.domChild = true;
      Stack.domWrapper = document.querySelector('.notification-list');
    } else {
      Stack.domChild = null;
      Stack.domWrapper = document.querySelector('body');
    }
  };

  setStack = (value, duration = 5) => {
    const index = Stack.notificationNextIndex;
    const notification = {
      duration: duration * 1000,
      value,
    };
    Stack.notifications[index] = notification;
    Stack.notificationNextIndex = index + 1;
    return { notification, index };
  };

  removeStackItem = (index) => {
    delete Stack.notifications[index];
  };
}

export class NotificationStack extends React.Component {
  removeTimeout = {};

  notificationItems = {};

  state = {
    nItems: {},
  };

  constructor(props) {
    super(props);
    this.getDomElem();
    this.domChild = Stack.domChild;
    this.notificationStack = new Stack();
  }

  componentDidMount() {
    this.addNewNotification();
  }

  componentDidUpdate(prevProps) {
    const { children: prevChildren } = prevProps;
    const { children } = this.props;
    if (children !== prevChildren) {
      this.addNewNotification();
    }
  }

  componentWillUnmount() {
    const { nItems } = this.state;
    Object.entries(nItems).forEach(([key]) => {
      this.removeFromStack(key);
    });
  }

  getDomElem = () => {
    if (!Stack.domWrapper || !this.domChild) {
      this.domChild = null;
      Stack.getDomElem();
    }
    this.domWrapper = Stack.domWrapper;
    this.container = Stack.container;
  };

  removeFromStack = (index) => {
    const { nItems } = this.state;
    this.notificationStack.removeStackItem(index);
    clearTimeout(this.removeTimeout[index]);
    delete nItems[index];
    this.setState({ nItems });
  };

  removeFromDuration = (index, duration) => {
    this.removeTimeout[index] = setTimeout(() => {
      this.removeFromStack(index);
    }, duration);
  };

  onDismiss = (index) => {
    this.removeFromStack(index);
  };

  addNewNotification = () => {
    const { nItems } = this.state;
    const { children, duration } = this.props;
    const { notification, index } = this.notificationStack.setStack(children, duration);
    nItems[index] = notification;
    this.setState({ nItems });
    this.removeFromDuration(index, notification.duration);
  };

  setNotificationItems = () => {
    const { nItems } = this.state;
    const { dismiss } = this.props;
    this.notificationItems = Object.entries(nItems).map(([key, item]) => (
      <div
        className={styles.notificationItem}
        key={key}
      >
        {dismiss && (
          <span
            role='presentation'
            onClick={() => this.onDismiss(key)}
            className={styles.dismiss}
          >
            {dismiss}
          </span>
        )}
        {item.value}
      </div>
    ));
  };

  render() {
    this.setNotificationItems();
    this.getDomElem();
    const { notificationItems } = this;
    if (this.container && this.domChild && this.domWrapper) {
      return ReactDOM.createPortal(
        notificationItems,
        this.domWrapper,
      );
    }
    return ReactDOM.createPortal(
      (
        <div className={`${styles['notification-list']} notification-list`}>
          {notificationItems}
        </div>
      ),
      document.querySelector('body'),
    );
  }
}

NotificationStack.propTypes = {
  children: PropTypes.any,
  dismiss: PropTypes.any,
  duration: PropTypes.number,
};

NotificationStack.defaultProps = {
  children: null,
  dismiss: null,
  duration: 10,
};
