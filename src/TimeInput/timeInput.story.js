import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { TimeInput } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';

storiesOf('TimeInput', module)
  .add('TimeInput', () => {
    const store = new Store({
      value: '',
    });

    function handler({ target }) {
      store.set({ value: target.value });
    }

    return (
      <State
        store={store}
      >
        {state => (
          <TimeInput
            onChange={handler}
            value={state.value}
          />
        )}
      </State>
    );
  }, {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='TimeInput' />,
    },
  });
