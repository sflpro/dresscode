import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

import { NotificationFrame } from '../NotificationFrame';
import { Notification } from './index';
import { Button } from '../Button';

storiesOf('Notification', module)
  .add('Notifications', () => {
    const store = new Store({
      notification: null,
    });

    const showNotification = (notificationType) => {
      store.set({
        notification: notificationType,
      });
    };

    return (
      <State store={store}>
        {state => (
          <ItemGroup title='Large Notifications'>
            {state.notification
              && (
                <Notification>
                  <NotificationFrame
                    status={state.notification}
                    message={`${state.notification} notification`}
                    title={state.notification}
                  />
                </Notification>
              )
            }

            <Item>
              <Button onClick={() => showNotification('information')}>
                Information
              </Button>
            </Item>

            <Item>
              <Button onClick={() => showNotification('warning')}>
                Warning
              </Button>
            </Item>

            <Item>
              <Button onClick={() => showNotification('error')}>
                Error
              </Button>
            </Item>

          </ItemGroup>
        )}
      </State>
    );
  });
