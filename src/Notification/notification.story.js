import React from 'react';
import { storiesOf } from '@storybook/react';

import { Notification } from '.';

import { Icon } from '../Icon';
import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';

storiesOf('Notification', module)
  .add('Notifications Frame', () => (
    <React.Fragment>
      <ItemGroup
        title='Large Notification'
      >
        <Item>
          <Notification
            status='information'
            message='Information Notification'
            title='Information'
            icon={(
              <Icon
                name='transaction'
                size={24}
              />
            )}
          />
          <Notification
            status='warning'
            message='Warning Notification'
            title='Warning'
            icon={(
              <Icon
                name='warning'
                size={24}
              />
            )}
          />
          <Notification
            status='error'
            message='Error Notification'
            title='Error'
            icon={(
              <Icon
                name='cross-circle'
                size={24}
              />
            )}
          />
          <Notification
            status='success'
            message='Success Notification'
            icon={(
              <Icon
                name='check'
                size={24}
              />
            )}
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
            />
            <Notification
              status='warning'
              message='Warning Notification'
              title='Warning'
              type='alert'
            />
            <Notification
              status='error'
              message='Error Notification'
              title='Error'
              type='alert'
            />
            <Notification
              status='success'
              message='Success Notification'
              type='alert'
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
            />
            <Notification
              status='warning'
              message='Warning Notification'
              title='Warning'
              type='alert'
              theme='light'
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
            />
          </Item>
        </ItemGroup>
      </div>

    </React.Fragment>
  ));
