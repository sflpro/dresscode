import React, { useState } from 'react';

import { Button } from '../Button';
import { Notification } from '.';
import { NotificationFrame } from '../NotificationFrame';

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
        <Notification>
          <NotificationFrame
            status='warning'
            message={`${notifications} - Warning Notification`}
            title='Warning'
            dismiss
          />
        </Notification>
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
        <Notification>
          <NotificationFrame
            status='error'
            message={`${notifications} - Error Notification`}
            title='Error'
            dismiss
          />
        </Notification>
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
        <Notification>
          <NotificationFrame
            status='information'
            message={`${notifications} - Information Notification`}
            title='Information'
            dismiss
          />
        </Notification>
      )}
    </React.Fragment>
  );
};
