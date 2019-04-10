import React from 'react';
import { storiesOf } from '@storybook/react';

import { NotificationFrame } from './';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Notification', module)
  .add('Notifications Frame', () => (
    <React.Fragment>
      <ItemGroup
        title='Large Notification'
      >
        <Item>
          <NotificationFrame
            status='information'
            message='Information Notification'
            title='Information'
            dismiss
          />
          <NotificationFrame
            status='warning'
            message='Warning Notification'
            title='Warning'
            dismiss
          />
          <NotificationFrame
            status='error'
            message='Error Notification'
            title='Error'
          />
          <NotificationFrame
            status='success'
            message='Success Notification'
            dismiss
          />
        </Item>
      </ItemGroup>
      <div style={{ display: 'flex' }}>

        <ItemGroup
          title='Alert Notifications'
        >
          <Item>
            <NotificationFrame
              status='information'
              message='Information Notification'
              title='Information'
              type='alert'
              dismiss
            />
            <NotificationFrame
              status='warning'
              message='Warning Notification'
              title='Warning'
              type='alert'
              dismiss
            />
            <NotificationFrame
              status='error'
              message='Error Notification'
              title='Error'
              type='alert'
              dismiss
            />
            <NotificationFrame
              status='success'
              message='Success Notification'
              type='alert'
              dismiss
            />
          </Item>
        </ItemGroup>

        <ItemGroup
          title='Light Alert Notifications'
        >
          <Item>
            <NotificationFrame
              status='information'
              message='Information Notification'
              title='Information'
              type='alert'
              theme='light'
              dismiss
            />
            <NotificationFrame
              status='warning'
              message='Warning Notification'
              title='Warning'
              type='alert'
              theme='light'
              dismiss
            />
            <NotificationFrame
              status='error'
              message='Error Notification'
              title='Error'
              type='alert'
              theme='light'
            />
            <NotificationFrame

              status='success'
              message='Success Notification'
              type='alert'
              theme='light'
              dismiss
            />
          </Item>
        </ItemGroup>
      </div>

    </React.Fragment>
  ));
