import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';

storiesOf('Icons', module)
  .add('Examples', () => {
    const iconTypes = [
      'checked',
      'tracker',
      'arrow-down',
      'arrow-up',
      'arrow-right',
      'arrow-left',
      'check',
      'warning',
      'eye',
      'thick',
      'cross',
      'cross-circle',
      'menu',
      'transaction',
      'triangle',
      'date',
      'facebook',
      'instagram',
      'linkedin',
      'twitter',
      'sorting',
      'more',
      'profile',
      'settings',
      'exit',
      'upload',
      'message',
      'bell',
      'pencil',
      'history',
      'coins',
      'loan',
      'cards',
      'wallet',
      'dashboard',
      'plus',
      'download',
    ];

    return (
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
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {iconTypes.map(item => (
              <Item
                key={item}
                style={{
                  marginBottom: '8px',
                  marginRight: '8px',
                  border: 'solid 1px',
                  padding: '8px',
                }}
              >
                <span style={{ display: 'flex' }}>
                  <Icon
                    name={item}
                    size={24}
                  />
                  <span style={{ marginLeft: '8px' }}>
                    {item}
                  </span>
                </span>
              </Item>
            ))}
          </div>
        </ItemGroup>
      </>
    );
  })
  .add('Icon', () => (
    <Icon
      name='tracker'
    />
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Icon' />,
    },
  });
