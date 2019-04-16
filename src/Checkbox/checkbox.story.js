import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { Checkbox } from '.';

import { Label } from '../Label';
import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

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
                <Label
                  display='col'
                >
                  <Checkbox
                    value='Ակտիվ'
                    checked={state.active}
                    name='active'
                    onChange={handler}
                  />
                  Ակտիվ
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label
                  display='col'
                >
                  <Checkbox
                    value='Սավառել'
                    checked={state.hover}
                    name='hover'
                    onChange={handler}
                  />
                  Սավառել
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label
                  display='col'
                >
                  <Checkbox
                    value='Սովորական'
                    checked={state.regular}
                    name='regular'
                    onChange={handler}
                  />
                  Սովորական
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label
                  display='col'
                  disabled
                >
                  <Checkbox
                    value='Անաշխատունակ'
                    disabled
                    onChange={handler}
                  />
                  Անաշխատունակ
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label
                  display='col'
                  disabled
                >
                  <Checkbox
                    value='Ակտիվ, սրանից'
                    checked
                    disabled
                    onChange={handler}
                  />
                  Ակտիվ, սրանից
                </Label>
              </Item>
            </ItemRow>
          </ItemGroup>,
        ]}
      </State>
    );
  });
