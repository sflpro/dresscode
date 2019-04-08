import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { DatePickerRange } from '.';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Date picker Range', module)
  .add('Date picker range', () => {
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
                <DatePickerRange
                  value={state.datePickerValue}
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
