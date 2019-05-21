import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { NotificationStack } from '.';

import { Notification } from '../Notification';
import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';
import { Button } from '../Button';
import { Icon } from '../Icon';

const ICON_TYPE = {
  information: 'transaction',
  success: 'check',
  warning: 'warning',
  error: 'cross-circle',
};

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
              <NotificationStack>
                {dismiss => (
                  <div style={{ width: '480px' }}>
                    <Notification
                      status={state.notification}
                      title={state.notification}
                      icon={(
                        <Icon
                          size={24}
                          name={ICON_TYPE[state.notification]}
                        />
                      )}
                      action={(
                        <Icon
                          size={24}
                          name='cross'
                          onClick={dismiss}
                        />
                      )}
                    >
                      {state.notification}
                      {' '}
                      notification
                    </Notification>
                  </div>
                )}
              </NotificationStack>
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
