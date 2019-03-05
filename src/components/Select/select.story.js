import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { Select } from '.';

import { Option } from '../Option';

storiesOf('Select', module)
  .add('Dropdown', () => {
    const store = new Store({
      value: 'option1',
      open: false,
    });
    return (
      <State
        store={store}
      >
        <Select
          value={store.get('value')}
          onClick={() => store.set({ open: !store.state.open })}
          onChange={(e) => {
            store.set({
              value: e.currentTarget.value,
              open: false,
            });
          }}
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
      </State>
    );
  })
  .add('Active dropdown', () => {
    const store = new Store({
      value: 'option1',
      open: true,
    });
    return (
      <State
        store={store}
      >
        <Select
          value={store.get('value')}
          onClick={() => store.set({ open: !store.state.open })}
          onChange={(e) => {
            store.set({
              value: e.currentTarget.value,
            });
          }}
          open
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
      </State>
    );
  })
  .add('Dropdown with label', () => {
    const store = new Store({
      value: 'option1',
      open: false,
    });
    return (
      <State
        store={store}
      >
        <Select
          value={store.get('value')}
          onClick={() => store.set({ open: !store.state.open })}
          onChange={(e) => {
            store.set({
              value: e.currentTarget.value,
              open: false,
            });
          }}
          label='Select label'
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
      </State>
    );
  })
  ;
