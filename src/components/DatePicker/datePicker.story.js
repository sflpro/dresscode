import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';
import { DateInput } from '../DateInput';

storiesOf('Date picker', module)
  .add('Date picker', () => {
    const store = new Store({
      datePickerValue: '25-12-2019',
    });

    function handleDateInputChange({ target }) {
      store.set({
        datePickerValue: target.value,
      });
    }

    function handleDatePickerChange(datePickerValue) {
      store.set({
        datePickerValue,
      });
    }

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Date picker'
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