import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { Checkbox } from '../Checkbox/Checkbox.js';

import { ControlsGroup } from "./ControlsGroup.js";


storiesOf('ControlsGroup', module).add('CheckboxGroup', () => {
  const store = new Store({
    first: true,
    second: true,
    third: false,
  });

  function handler({ target }) {
    store.set({
      ...store.state,
      ...{
        [target.id]: !store.state[target.id],
      },
    });
  }

  return (
    <State
      store={store}
    >
      {state => [
        <ControlsGroup
          title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա'
          key='key'
        >
          <Checkbox
            label='Այո'
            checked={state.first}
            onChange={handler}
          />
          <Checkbox
            label='Ոչ'
            checked={state.second}
            onChange={handler}
          />
          <Checkbox
            label='Ճարս Ի՞նչ'
            checked={state.third}
            onChange={handler}
          />
        </ControlsGroup>
      ]}
    </State>
  );
});
