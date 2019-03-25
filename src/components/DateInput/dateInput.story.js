import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { DateInput } from '../DateInput';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Date input', module)
  .add('Date input', () => {
    const store = new Store({
      datePickerValue: new Date(),
    });

    function handleDatePickerChange(datePickerValue) {
      store.set({
        datePickerValue,
      });
    }

    function handleDateInputChange(e) {
    }

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Date Input'
          >
            <Item>
              <DateInput
                value={state.datePickerValue}
                onDatePickerChange={handleDatePickerChange}
                onDateInputChange={handleDateInputChange}
              />
            </Item>
          </ItemGroup>
        }
      </State>
    );
  });
