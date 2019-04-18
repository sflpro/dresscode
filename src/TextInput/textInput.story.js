import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { TextInput } from '.';

import { DateRangeInput } from '../DateRangeInput';
import { CardInput } from '../CardInput';
import { DateInput } from '../DateInput';
import { Label } from '../Label';
import { Icon } from '../Icon';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Input', module)
  .add('Examples', () => {
    const store = new Store({
      default: 'Default text',
      disabled: 'Disabled text',
      datePickerValue: new Date(),
      monthPickerValue: new Date(),
      prefix: '',
      success: '',
      notDetected: '1234567891234567',
      masterCard: '5234567891234567',
      visa: '4234567891234567',
      empty: '',
      from: new Date(),
      to: new Date(),
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

    function handleDateRangePickerChange(date) {
      store.set({
        ...store.state,
        ...date,
      });
    }

    function handleDateRangeInputChange(date) {
      store.set({
        ...store.state,
        ...date,
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
                  <Label>
                    Label
                    <TextInput
                      name='basic'
                      value={state.basic}
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
                <Item>
                  <Label>
                    Label
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
                  <Label>
                    Label
                    <TextInput
                      name='placeholder'
                      value={state.placeholder}
                      placeholder='Placeholder text'
                      onChange={handleInputChange}
                    />
                  </Label>
                </Item>
                <Item>
                  <Label>
                    Label
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
                  <Label>
                    Password
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
                  <Label>
                    Date picker
                    <DateInput
                      value={state.datePickerValue}
                      onDatePickerChange={handleDatePickerChange}
                      onDateInputChange={handleDateInputChange}
                    />
                  </Label>
                </Item>
              </ItemRow>
              <ItemRow>
                <Item>
                  <Label
                    text='Date range picker'
                  >
                    <DateRangeInput
                      onDatePickerChange={handleDateRangePickerChange}
                      onDateInputChange={handleDateRangeInputChange}
                      from={state.from}
                      to={state.to}
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
                  <Label>
                    Label
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
                    isValid
                  >
                    Success
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
                    hasError
                  >
                    Error
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
            <ItemGroup
              title='Card input states'
            >
              <ItemRow>
                <Item>
                  <Label
                    text='Empty'
                  >
                    <CardInput
                      onChange={handleInputChange}
                      value={state.empty}
                      name='empty'
                    />
                  </Label>
                </Item>
                <Item>
                  <Label
                    text='Not Detected'
                  >
                    <CardInput
                      onChange={handleInputChange}
                      value={state.notDetected}
                      name='notDetected'
                    />
                  </Label>
                </Item>
              </ItemRow>
              <ItemRow>
                <Item>
                  <Label
                    text='Visa'
                  >
                    <CardInput
                      onChange={handleInputChange}
                      value={state.visa}
                      name='visa'
                    />
                  </Label>
                </Item>
                <Item>
                  <Label
                    text='MasterCard'
                  >
                    <CardInput
                      onChange={handleInputChange}
                      value={state.masterCard}
                      name='masterCard'
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
          </>
        )}
      </State>
    );
  })
  .add('Text Input', () => (
    <TextInput />
  ), InfoStoryConfig)
  .add('Password Input', () => (
    <TextInput type='password' />
  ), InfoStoryConfig)
  .add('Card Input', () => (
    <CardInput />
  ), InfoStoryConfig);
