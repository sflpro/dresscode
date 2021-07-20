import React from 'react';
import { storiesOf } from '@storybook/react';

import { Autocomplete } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';
import { InfoStoryConfig } from '../configs';
import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

storiesOf('Form controls/Input', module)
  .add('Autocomplete', () => (
    <ItemGroup
      title='Autocomplete'
    >
      <ItemRow>
        <Item>
          <Autocomplete
            getOptions={() => ['test 1', 'test 2', 'test 3'].map(item => ({
              value: item,
              label: item,
            }))}
            onChange={ev => console.dir(ev)}
            value='test'
          />
        </Item>
        <Item>
          <Autocomplete
            getOptions={() => new Promise((resolve) => {
              setTimeout(() => {
                resolve(['dynamic Item 1', 'dynamic Item 2', 'dynamic Item 3'].map(item => ({
                  value: item,
                  label: item,
                })));
              }, 2000);
            })}
            onChange={ev => console.dir(ev)}
            value='dynamic'
          />
        </Item>
      </ItemRow>
    </ItemGroup>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Autocomplete' />,
    },
  });
