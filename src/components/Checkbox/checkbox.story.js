import React from 'react';
import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from '@storybook/react';

import {ControlsGroup} from "../ControlsGroup";
import {Checkbox} from './index.js';

storiesOf('Checkbox', module)
  .add('Checkbox', () => {
      const store = new Store({
        active: true,
        hover: false,
        regular: false,
      });

      function handler({target}) {
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
            <ControlsGroup key='key'>
              <Checkbox
                label='Ակտիվ'
                checked={state.active}
                name='active'
                onChange={handler}
              />
              <Checkbox
                label='Սավառել'
                checked={state.hover}
                name='hover'
                onChange={handler}
              />
              <Checkbox
                label='Սովորական'
                checked={state.regular}
                name='regular'
                onChange={handler}
              />
              <Checkbox
                label='Անաշխատունակ'
                disabled
                onChange={handler}
              />
              <Checkbox
                label='Ակտիվ, սրանից'
                checked
                disabled
                onChange={handler}
              />
            </ControlsGroup>
          ]}
        </State>
      );
    }
  );
