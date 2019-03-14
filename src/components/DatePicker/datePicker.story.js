import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('DatePicker', module)
  .add('Date Picker', () => {
    return (
      <ItemGroup
        title='Date Picker'
      >
        <Item>
          <DatePicker />
        </Item>
      </ItemGroup>
    )
  });
