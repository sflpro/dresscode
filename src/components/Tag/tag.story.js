import React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemGroup } from '../ItemGroup';
import { Item } from '../Item';

import { Tag } from '.';

storiesOf('Tag', module)
  .add('Tag', () => {
    return (
      <ItemGroup
        title='Tag'
      >
        <Item>
          <Tag
            name='Primary tag'
          />
        </Item>
        <Item>
          <Tag
            name='Secondary tag'
            type='secondary'
          />
        </Item>
        <Item>
          <Tag
            name='Removable tag'
            clickable
          />
        </Item>
      </ItemGroup>
    )
  });
