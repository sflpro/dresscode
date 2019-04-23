import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';

storiesOf('Icons', module)
  .add('Examples', () => (
    <>
      <ItemGroup title='Icon sizes'>
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
      </ItemGroup>
      <ItemGroup title='Icon colors'>
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
      <ItemGroup title='Icon types'>
        <Item>
          <Icon
            name='checked'
            size={24}
          />
          checked
        </Item>
        <Item>
          <Icon
            name='tracker'
            size={24}
          />
          tracker
        </Item>
        <Item>
          <Icon
            name='check'
            size={24}
          />
          check
        </Item>
        <Item>
          <Icon
            name='arrow-down'
            size={24}
          />
          arrow-down
        </Item>
        <Item>
          <Icon
            name='warning'
            size={24}
          />
          warning
        </Item>
        <Item>
          <Icon
            name='eye'
            size={24}
          />
          eye
        </Item>
        <Item>
          <Icon
            name='thick'
            size={24}
          />
          thick
        </Item>
        <Item>
          <Icon
            name='cross'
            size={24}
          />
          cross
        </Item>
        <Item>
          <Icon
            name='menu'
            size={24}
          />
          menu
        </Item>
        <Item>
          <Icon
            name='transaction'
            size={24}
          />
          transaction
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
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction text='Icon' />,
    },
  });
