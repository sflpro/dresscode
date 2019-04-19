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

  onDismiss = index => () => this.removeFromStack(index);

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
    this.notificationItems = Object.entries(nItems).map(([key, item]) => (
      <div
        className={styles.notificationItem}
        key={key}
      >
        {item.value}
      </div>
    ));
  };

  getNotificationItems = () => this.notificationItems.map((item) => {
    const { onDismiss } = this;
    const { children: itemChildren } = item.props;
    return (
      <React.Fragment key={item.key}>
        {itemChildren(onDismiss(item.key), item.key)}
      </React.Fragment>
    );
  });

  render() {
    this.setNotificationItems();
    this.getDomElem();
    const { getNotificationItems } = this;

    if (this.container && this.domChild && this.domWrapper) {
      return ReactDOM.createPortal(
        getNotificationItems(),
        this.domWrapper,
      );
    }
    return ReactDOM.createPortal(
      (
        <div className={`${styles['notification-list']} notification-list`}>
          {getNotificationItems()}
        </div>
      ),
      document.querySelector('body'),
    );
  }
}

NotificationStack.propTypes = {
  /** String or JSX or Element, content of notification */
  children: PropTypes.any,
  /** Number of seconds to display notification duration */
  duration: PropTypes.number,
};

NotificationStack.defaultProps = {
  children: null,
  duration: 10,
};
