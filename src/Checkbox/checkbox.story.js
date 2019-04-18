import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Checkbox } from '.';

import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Checkbox', module)
  .add('Examples', () => {
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
                    value='active'
                    checked={state.active}
                    name='active'
                    onChange={handler}
                  />
                  Active
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label
                  display='col'
                >
                  <Checkbox
                    value='hover'
                    checked={state.hover}
                    name='hover'
                    onChange={handler}
                  />
                  Hover
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
                    value='disabled'
                    disabled
                    onChange={handler}
                  />
                  Disabled
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
                    value='active disabled'
                    checked
                    disabled
                    onChange={handler}
                  />
                  Active Disabled
                </Label>
              </Item>
            </ItemRow>
          </ItemGroup>,
        ]}
      </State>
    );
  })
  .add('Checkbox', () => (
    <Checkbox />
  ), InfoStoryConfig);
