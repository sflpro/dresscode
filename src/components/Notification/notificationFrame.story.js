import React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

import { Info, Warning, Error } from './Test';

storiesOf('Notification', module)
  .add('Notifications Frame', () => (
    <ItemGroup
      title='Large Notifications'
    >
      <Item>
        <Info />
      </Item>
      <br />
      <Item>
        <Warning />
      </Item>
      <br />
      <Item>
        <Error />
      </Item>
    </ItemGroup>
  ));
