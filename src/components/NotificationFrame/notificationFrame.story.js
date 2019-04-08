import React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

import { Test, Test2, Test3 } from './Test';

storiesOf('Notification', module)
  .add('Notifications Frame', () => (
    <ItemGroup
      title='Large Notifications'
    >
      <Item>
        <Test />
      </Item>
      <br />
      <Item>
        <Test2 />
      </Item>
      <br />
      <Item>
        <Test3 />
      </Item>
    </ItemGroup>
  ));
