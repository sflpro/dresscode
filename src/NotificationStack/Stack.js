export class Stack {
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
