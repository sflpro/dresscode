import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { ToggleButton } from '.';

import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

const store = new Store({
  example1: false,
  example2: true,
  example3: false,
  example4: true,
});

function handler({ target }) {
  store.set({
    ...store.state,
    ...{
      [target.name]: !store.state[target.name],
    },
  });
}

storiesOf('Form controls/Toggle Button', module)
  .add('Examples', () => (
    <State store={store}>
      {state => (
        <ItemGroup
          title='Toggle Button'
        >
          <ItemRow>
            <Item style={{ width: '250px' }}>
              <Label
                style={{ justifyContent: 'space-between' }}
                display='col'
              >
                Option 1
                <ToggleButton
                  checked={state.example1}
                  onChange={handler}
                  name='example1'
                  value='example1'
                />
              </Label>
            </Item>
          </ItemRow>
          <ItemRow>
            <Item style={{ width: '250px' }}>
              <Label
                style={{ justifyContent: 'space-between' }}
                display='col'
              >
                Option 2
                <ToggleButton
                  checked={state.example2}
                  onChange={handler}
                  value='example2'
                  name='example2'
                />
              </Label>
            </Item>
          </ItemRow>
          <ItemRow>
            <Item style={{ width: '250px' }}>
              <Label
                style={{ justifyContent: 'space-between' }}
                display='col'
                disabled
              >
                Disabled
                <ToggleButton
                  checked={state.example3}
                  onChange={handler}
                  value='example3'
                  name='example3'
                  disabled
                />
              </Label>
            </Item>
          </ItemRow>
          <ItemRow>
            <Item style={{ width: '250px' }}>
              <Label
                style={{ justifyContent: 'space-between' }}
                display='col'
                disabled
              >
                Active Disabled
                <ToggleButton
                  checked={state.example4}
                  onChange={handler}
                  value='example4'
                  name='example4'
                  disabled
                />
              </Label>
            </Item>
          </ItemRow>
        </ItemGroup>
      )}
    </State>
  ))
  .add('Toggle Button', () => (
    <ToggleButton />
  ), InfoStoryConfig);
