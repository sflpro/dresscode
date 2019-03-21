import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { Select } from '.';

import { Option } from '../Option';
import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('Dropdown', module)
  .add('Dropdown', () => {
    const store = new Store({
      value: 'option1',
      open: false,
    });

    function handleSelectChange({ currentTarget }) {
      store.set({
        value: currentTarget.value,
        open: false,
      });
    }

    function handleSelectClick() {
      store.set({
        open: !store.state.open,
      });
    }
    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Dropdown'
            style={{ maxWidth: 300 }}
          >
            <ItemRow>
              <Item>
                <Select
                  label='Label'
                  value={state.value}
                  open={state.open}
                  onClick={handleSelectClick}
                  onChange={handleSelectChange}
                >
                  <Option
                    value='option1'
                    name='Option 1'
                    key={1}
                  />
                  <Option
                    value='option2'
                    name='Option 2'
                    key={2}
                  />
                  <Option
                    value='option3'
                    name='Option 3'
                    key={3}
                  />
                </Select>
              </Item>
            </ItemRow>
          </ItemGroup>
        }
      </State>
    );
  });
