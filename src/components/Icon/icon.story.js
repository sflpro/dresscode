import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Icons', module)
  .add('List', () => {
    return (
      <ItemGroup
        title='Icons'
      >
        <Item>
          <Icon
            name='tracker'
          />
        </Item>
        <Item>
          <Icon
            name='tracker'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='tracker'
            size={24}
            color='#ff5252'
          />
        </Item>
      </ItemGroup>
    );
  });
