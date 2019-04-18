import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tag } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { InfoStoryConfig } from '../configs';
import { Item } from '../helpers/Item';

storiesOf('Tag', module)
  .add('Examples', () => (
    <ItemGroup
      title='Tag'
    >
      <ItemRow>
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
      </ItemRow>
    </ItemGroup>
  ))
  .add('Tag', () => (
    <Tag
      name='Removable tag'
      clickable
    />
  ), InfoStoryConfig);
