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
            title='Information'
            icon={(
              <Icon
                name='transaction'
                size={24}
              />
            )}
            action={(
              <Icon
                name='cross'
                size={24}
              />
            )}
          >
            Information Notification
          </Notification>

          <Notification
            status='warning'
            title='Warning'
            icon={(
              <Icon
                name='warning'
                size={24}
              />
            )}
          >
            Warning Notification
          </Notification>
          <Notification
            status='error'
            title='Error'
            icon={(
              <Icon
                name='cross-circle'
                size={24}
              />
            )}
          >
            Error Notification
          </Notification>
          <Notification
            status='success'
            icon={(
              <Icon
                name='check'
                size={24}
              />
            )}
          >
            Success Notification
          </Notification>
        </Item>
      </ItemGroup>
      <div style={{ display: 'flex' }}>

        <ItemGroup
          title='Alert Notifications'
        >
          <Item>
            <Notification
              status='information'
              title='Information'
              type='alert'
              action={(
                <Icon
                  name='cross'
                  size={24}
                />
              )}
            >
              Information Notification
            </Notification>

            <Notification
              status='warning'
              title='Warning'
              type='alert'
              action={(
                <Icon
                  name='cross'
                  size={24}
                />
              )}
            >
              Warning Notification
            </Notification>

            <Notification
              status='error'
              title='Error'
              type='alert'
            >
              Error Notification
            </Notification>

            <Notification
              status='success'
              type='alert'
            >
              Success Notification
            </Notification>
          </Item>
        </ItemGroup>

        <ItemGroup
          title='Light Alert Notifications'
        >
          <Item>
            <Notification
              status='information'
              title='Information'
              type='alert'
              theme='light'
            >
              Information Notification
            </Notification>
            <Notification
              status='warning'
              title='Warning'
              type='alert'
              theme='light'
            >
              Warning Notification
            </Notification>
            <Notification
              status='error'
              title='Error'
              type='alert'
              theme='light'
            >
              Error Notification
            </Notification>
            <Notification
              status='success'
              type='alert'
              theme='light'
            >
              Success Notification
            </Notification>
          </Item>
        </ItemGroup>
      </div>

    </React.Fragment>
  ));
