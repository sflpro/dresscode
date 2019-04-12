import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { TextInput } from '.';

import { DateInput } from '../DateInput';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('Form controls', module)
  .add('Text Input', () => {
    const store = new Store({
      default: 'Default text',
      disabled: 'Disabled text',
      datePickerValue: new Date(),
      monthPickerValue: new Date(),
    });

    function handleInputChange({ target }) {
      store.set({
        ...store.state,
        ...{
          [target.name]: target.value,
        },
      });
    }

    function handleDatePickerChange(datePickerValue) {
      store.set({
        datePickerValue,
      });
    }

    function handleDateInputChange(datePickerValue) {
      store.set({
        datePickerValue,
      });
    }

    function handleMonthPickerChange(monthPickerValue) {
      store.set({
        monthPickerValue,
      });
    }

    function handleMonthInputChange(monthPickerValue) {
      store.set({
        monthPickerValue,
      });
    }

    return (
      <State
        store={store}
      >
        {state => (
          <>
            <ItemGroup
              title='Text input states'
            >
              <ItemRow>
                <Item>
                  <Label
                    text='Label'
                  >
                    <TextInput
                      name='basic'
                      value={state.basic}
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
                <Item>
                  <Label
                    text='Label'
                  >
                    <TextInput
                      name='default'
                      value={state.default}
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
              </ItemRow>
              <ItemRow>
                <Item>
                  <Label
                    text='Label'
                  >
                    <TextInput
                      name='placeholder'
                      value={state.placeholder}
                      placeholder='Placeholder text'
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
                <Item>
                  <Label
                    text='Label'
                  >
                    <TextInput
                      name='disabled'
                      value={state.disabled}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
            <ItemGroup
              title='Text input type password'
            >
              <ItemRow>
                <Item>
                  <Label
                    text='Password'
                  >
                    <TextInput
                      name='password'
                      value={state.password}
                      type='password'
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
            <ItemGroup
              title='Text input type date'
            >
              <ItemRow>
                <Item>
                  <Label
                    text='Date picker'
                  >
                    <DateInput
                      value={state.datePickerValue}
                      onDatePickerChange={handleDatePickerChange}
                      onDateInputChange={handleDateInputChange}
                    />
                  </Label>
                </Item>
                <Item>
                  <Label
                    text='Month picker'
                  >
                    <DateInput
                      value={state.monthPickerValue}
                      onDatePickerChange={handleMonthPickerChange}
                      onDateInputChange={handleMonthInputChange}
                      format='MM/YYYY'
                      view='month'
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
            <ItemGroup
              title='Text input with prefix'
            >
              <ItemRow>
                <Item>
                  <Label
                    text='Label'
                  >
                    <TextInput
                      name='prefix'
                      value={state.prefix}
                      prefix='+374'
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
            <ItemGroup
              title='Text input with icon'
            >
              <ItemRow>
                <Item>
                  <Label
                    text='Success'
                  >
                    <TextInput
                      name='success'
                      value={state.success}
                      icon={(
                        <Icon
                          name='check'
                          size={24}
                        />
                      )}
                      onChange={handleInputChange}
                      isValid
                    />
                  </Label>
                </Item>
                <Item>
                  <Label
                    text='Error'
                    hasError
                  >
                    <TextInput
                      name='error'
                      value={state.error}
                      icon={(
                        <Icon
                          name='warning'
                          size={24}
                        />
                      )}
                      error='Error text'
                      onChange={handleInputChange}
                      hasError
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
          </>
        )}
      </State>
    );
  });
