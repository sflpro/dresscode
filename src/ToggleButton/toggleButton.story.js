import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { ToggleButton } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { Label } from '../Label';

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

storiesOf('Form controls', module)
  .add('Toggle Button', () => (
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
                Այ էս մեկը
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
                Համարյա էս մեկը
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
                էս մեկը չես կարա
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
                էս մեկն էլ
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
  ));
