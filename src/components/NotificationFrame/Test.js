import React, { useState } from 'react';

import { Button } from '../Button';
import { NotificationFrame } from '.';
import { Notification } from '../Notification';

export const Test = () => {
  const [notifications, setNotifications] = useState(0);

  const onChangeNotificationCount = () => {
    const newNotifications = notifications + 1;
    setNotifications(newNotifications);
  };

  return (
    <React.Fragment>
      <Button onClick={onChangeNotificationCount}>
        Test 1
      </Button>
      {notifications > 0 && (
        <NotificationFrame>
          <Notification
            status='information'
            message='Information Notification'
            title='Information'
            dismiss
          />
        </NotificationFrame>
      )}
      {notifications}
    </React.Fragment>
  );
};

export const Test2 = () => {
  const [notifications, setNotifications] = useState(0);

  const onChangeNotificationCount = () => {
    const newNotifications = notifications + 1;
    setNotifications(newNotifications);
  };

  return (
    <React.Fragment>
      <Button onClick={onChangeNotificationCount}>
        Test 2
      </Button>
      {notifications > 0 && (
        <NotificationFrame>
          <Notification
            status='warning'
            message='Warning Notification'
            title='Warning'
            dismiss
          />
        </NotificationFrame>
      )}
      {notifications}
    </React.Fragment>
  );
};

export const Test3 = () => {
  const [notifications, setNotifications] = useState(0);

  const onChangeNotificationCount = () => {
    const newNotifications = notifications + 1;
    setNotifications(newNotifications);
  };

  return (
    <React.Fragment>
      <Button onClick={onChangeNotificationCount}>
        Test 3
      </Button>
      {notifications > 0 && (
        <NotificationFrame>
          <Notification
            status='warning'
            message='Warning Notification'
            title='Warning'
            dismiss
          />
        </NotificationFrame>
      )}
      {notifications}
    </React.Fragment>
  );
};
