import React, { useState } from 'react';

import { Button } from '../Button';
import { NotificationFrame } from '.';
import { Notification } from '../NotificationFrame';

export const Warning = () => {
  const [notifications, setNotifications] = useState(0);

  const onChangeNotificationCount = () => {
    const newNotifications = notifications + 1;
    setNotifications(newNotifications);
  };

  return (
    <React.Fragment>
      <Button
          neutral
          onClick={onChangeNotificationCount}
      >
        Warning
      </Button>
      {notifications > 0 && (
        <NotificationFrame>
          <Notification
            status='warning'
            message={`${notifications} - Warning Notification`}
            title='Warning'
            dismiss
          />
        </NotificationFrame>
      )}
    </React.Fragment>
  );
};

export const Error = () => {
  const [notifications, setNotifications] = useState(0);

  const onChangeNotificationCount = () => {
    const newNotifications = notifications + 1;
    setNotifications(newNotifications);
  };

  return (
    <React.Fragment>
      <Button
          warning
          onClick={onChangeNotificationCount}
      >
        Error
      </Button>
      {notifications > 0 && (
        <NotificationFrame>
          <Notification
            status='error'
            message={`${notifications} - Error Notification`}
            title='Error'
            dismiss
          />
        </NotificationFrame>
      )}
    </React.Fragment>
  );
};

export const Info = () => {
  const [notifications, setNotifications] = useState(0);

  const onChangeNotificationCount = () => {
    const newNotifications = notifications + 1;
    setNotifications(newNotifications);
  };

  return (
    <React.Fragment>
      <Button onClick={onChangeNotificationCount}>
        Information
      </Button>
      {notifications > 0 && (
        <NotificationFrame>
          <Notification
            status='information'
            message={`${notifications} - Information Notification`}
            title='Information'
            dismiss
          />
        </NotificationFrame>
      )}
    </React.Fragment>
  );
};
