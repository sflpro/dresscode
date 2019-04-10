import React from 'react';
import { storiesOf } from '@storybook/react';
import {State, Store} from "@sambego/storybook-state";

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

import { Info, Warning, Error } from './Test';
import {NotificationFrame} from "../NotificationFrame";
import {Notification} from "./index";
import {Button} from "../Button";

storiesOf('Notification', module)
  .add('Notifications', () => {
    const store = new Store({
      notification: [],
    });

    const showNotification = (notificationType) => {
      console.log(store)

      const notification = Array.from(new Set([...store.state.notification, notificationType]));
      store.set({
        ...store.state,
        notification: notification,
      });
    };

    return (
        <State
            store={store}
        >
          {state => (
            <ItemGroup
                title='Large Notifications'
            >
              {state.notification.includes('information') && (
                <Notification>
                  <NotificationFrame
                      status='information'
                      message='Information Notification'
                      title='Information'
                    />
                </Notification>
              )}


              {state.notification.includes('warning') && (
                <Notification>
                  <NotificationFrame
                    status='warning'
                    message='Warning Notification'
                    title='Warning'
                    dismiss
                  />
                </Notification>
              )}

              <Item>
                <Button onClick={() => showNotification('information')}>
                  Information
                </Button>
              </Item>


              <Item>
                <Button onClick={() => showNotification('warning')}>
                  Information
                </Button>
              </Item>
<br />
<br />
<br />
<br />
<br />
              <Item>
                <Info/>
              </Item>
              <br/>
              <Item>
                <Warning/>
              </Item>
              <br/>
              <Item>
                <Error/>
              </Item>
            </ItemGroup>
          )}
        </State>
    )
  });
