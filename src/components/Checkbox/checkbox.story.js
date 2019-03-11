import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { Checkbox } from '.';

import { ItemGroup } from '../ItemGroup';
import { Item } from '../Item';

storiesOf('Checkbox', module)
  .add('Checkbox', () => {
    const store = new Store({
      active: true,
      hover: false,
      regular: false,
    });

    function handler({ target }) {
      store.set({
        ...store.state,
        ...{
          [target.name]: !store.state[target.name],
        },
      });
    }

    return (
      <State store={store}>
        {state => [
          <ItemGroup
            title='Checkbox'
          >
            <Item>
              <Checkbox
                label='Ակտիվ'
                checked={state.active}
                name='active'
                onChange={handler}
              />
            </Item>
            <Item>
              <Checkbox
                label='Սավառել'
                checked={state.hover}
                name='hover'
                onChange={handler}
              />
            </Item>
            <Item>
              <Checkbox
                label='Սովորական'
                checked={state.regular}
                name='regular'
                onChange={handler}
              />
            </Item>
            <Item>
              <Checkbox
                label='Անաշխատունակ'
                disabled
                onChange={handler}
              />
            </Item>
            <Item>
              <Checkbox
                label='Ակտիվ, սրանից'
                checked
                disabled
                onChange={handler}
              />
            </Item>
          </ItemGroup>
        ]}
      </State>
    );
  }
  );