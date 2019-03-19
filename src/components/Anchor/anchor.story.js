import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('Anchor', module)
  .add('Anchor', () => {
    return (
      <ItemGroup
        title='Anchor'
      >
        <ItemRow>
          <Item>
            <Anchor
              href='https://sflpro.com/'
            >
              Link
            </Anchor>
          </Item>
        </ItemRow>
      </ItemGroup>
    )
  });
