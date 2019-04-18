import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { InfoStoryConfig } from '../configs';
import { Item } from '../helpers/Item';

storiesOf('Icons', module)
  .add('Examples', () => (
    <>
      <ItemGroup
        title='Icon sizes'
      >
        <Item>
          <Icon
            name='tracker'
          />
          Text
        </Item>
        <Item>
          <Icon
            name='tracker'
            size={24}
          />
        </Item>
      </ItemGroup>
      <ItemGroup
        title='Icon colors'
      >
        <Item>
          <Icon
            name='tracker'
            size={24}
            color='#ff5252'
          />
        </Item>
        <Item>
          <Icon
            name='tracker'
            size={24}
            color='#0F0'
          />
        </Item>
      </ItemGroup>
      <ItemGroup
        title='Icon types'
      >
        <Item>
          <Icon
            name='checked'
            size={24}
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
            name='check'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='arrow-down'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='warning'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='eye'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='thick'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='close'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='menu'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='facebook'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='instagram'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='linkedin'
            size={24}
          />
        </Item>
        <Item>
          <Icon
            name='twitter'
            size={24}
          />
        </Item>
      </ItemGroup>
    </>
  ))
  .add('Icon', () => (
    <Icon
      name='tracker'
    />
  ), InfoStoryConfig);
