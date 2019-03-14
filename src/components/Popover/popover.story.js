import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { Popover } from '.';

import { DatePicker } from '../DatePicker';
import { TextInput } from '../TextInput';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';

storiesOf('Position Control', module)
  .add('Date picker', () => {
    const store = new Store({
      datePickerValue: '25-12-2019',
    });

    function handleDatePickerInputChange({ target }) {
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
            title='Dropdown'
            style={{ maxWidth: 300 }}
          >
            <Item>
              <Popover
                trigger='click'
                content={
                  <DatePicker
                    value={state.datePickerValue}
                    onChange={handleDatePickerChange}
                    style={{ height: 200, backgroundColor: 'green' }}
                  />
                }
              >
                <TextInput
                  label='Date Picker'
                  onChange={handleDatePickerInputChange}
                  value={state.datePickerValue}
                  type='date'
                />
              </Popover>
            </Item>
          </ItemGroup>
        }
      </State>
    );
  });
