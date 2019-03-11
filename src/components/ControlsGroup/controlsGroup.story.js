import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { ControlsGroup } from '.';

import { Checkbox } from '../Checkbox';
import { ItemGroup } from '../ItemGroup';
import { Item } from '../Item';

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
        [target.name]: !store.state[target.name],
      },
    });
  }

  return (
    <State
      store={store}
    >
      {state => [
        <ItemGroup
          title='Checkbox group'
        >
          <Item>
            <ControlsGroup
              title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա'
              key='key'
            >
              <Checkbox
                label='Այո'
                checked={state.first}
                name='first'
                onChange={handler}
              />
              <Checkbox
                label='Ոչ'
                checked={state.second}
                name='second'
                onChange={handler}
              />
              <Checkbox
                label='Ճարս Ի՞նչ'
                checked={state.third}
                name='third'
                onChange={handler}
              />
            </ControlsGroup>
          </Item>
        </ItemGroup>
      ]}
    </State>
  );
});
