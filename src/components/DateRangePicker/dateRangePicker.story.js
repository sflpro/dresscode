import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { DateRangePicker } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Date range picker', module)
  .add('Date range picker', () => {
    const store = new Store({
      from: null,
      to: null,
      enteredTo: null,
    });

    function handleRangeDatePickerChange(range) {
      store.set({ ...range });
    }

    return (
      <State
        store={store}
      >
        {state =>
          <>
            <ItemGroup
              title='Date Picker Range'
            >
              <Item>
                <DateRangePicker
                  onChange={handleRangeDatePickerChange}
                  numberOfMonths={2}
                  from={state.from}
                  to={state.to}
                  enteredTo={state.enteredTo}
                />
              </Item>
            </ItemGroup>
          </>
        }
      </State>
    );
  });
