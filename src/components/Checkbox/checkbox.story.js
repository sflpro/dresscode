import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { Checkbox } from './Checkbox.js';


storiesOf('Checkbox', module)
  .add('Active', () => {
    const store = new Store({
      checked: true,
    });
    return (
      <State
        store={store}
      >
        <Checkbox
          label='Ակտիվ'
          checked={store.get('checked')}
          onChange={() => store.set({ checked: !store.get('checked') })}
        />
      </State>
    );
  })
  .add('Hover', () => {
    const store = new Store({
      checked: false,
    });
    return (
      <State
        store={store}
      >
        <Checkbox
          label='Սավառել'
          checked={store.get('checked')}
          onChange={() => store.set({ checked: !store.get('checked') })}
        />
      </State>
    );
  })
  .add('Regular', () => {
    const store = new Store({
      checked: false,
    });
    return (
      <State
        store={store}
      >
        <Checkbox
          label='Սովորական'
          checked={store.get('checked')}
          onChange={() => store.set({ checked: !store.get('checked') })}
        />
      </State>
    );
  })
  .add('Disable', () => (
    <Checkbox
      label='Անաշխատունակ'
      disabled
    />
  ))
  .add('Active Disable', () => (
    <Checkbox
      label='Ակտիվ, սրանից'
      checked
      disabled
    />
  ));