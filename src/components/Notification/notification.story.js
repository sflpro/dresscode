import React from 'react';
import { storiesOf } from '@storybook/react';

import { Notification } from './';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Notification', module)
  .add('Notifications', () => (
    <React.Fragment>
      <ItemGroup
        title='Large Notifications'
      >
        <Item>
          <Notification
            status='information'
            message='Information Notification'
            title='Information'
            dismiss
          />
          <Notification
            status='warning'
            message='Warning Notification'
            title='Warning'
            dismiss
          />
          <Notification
            status='error'
            message='Error Notification'
            title='Error'
          />
          <Notification
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
            <Notification
              status='information'
              message='Information Notification'
              title='Information'
              type='alert'
              dismiss
            />
            <Notification
              status='warning'
              message='Warning Notification'
              title='Warning'
              type='alert'
              dismiss
            />
            <Notification
              status='error'
              message='Error Notification'
              title='Error'
              type='alert'
              dismiss
            />
            <Notification
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
            <Notification
              status='information'
              message='Information Notification'
              title='Information'
              type='alert'
              theme='light'
              dismiss
            />
            <Notification
              status='warning'
              message='Warning Notification'
              title='Warning'
              type='alert'
              theme='light'
              dismiss
            />
            <Notification
              status='error'
              message='Error Notification'
              title='Error'
              type='alert'
              theme='light'
            />
            <Notification

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
