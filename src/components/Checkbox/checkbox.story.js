import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { Checkbox } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('Form controls', module)
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
            <ItemRow>
              <Item>
                <Checkbox
                  label='Ակտիվ'
                  checked={state.active}
                  name='active'
                  onChange={handler}
                />
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Checkbox
                  label='Սավառել'
                  checked={state.hover}
                  name='hover'
                  onChange={handler}
                />
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Checkbox
                  label='Սովորական'
                  checked={state.regular}
                  name='regular'
                  onChange={handler}
                />
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Checkbox
                  label='Անաշխատունակ'
                  disabled
                  onChange={handler}
                />
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Checkbox
                  label='Ակտիվ, սրանից'
                  checked
                  disabled
                  onChange={handler}
                />
              </Item>
            </ItemRow>
          </ItemGroup>,
        ]}
      </State>
    );
  });
