import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { TextInput } from '.';

import { DateRangeInput } from '../DateRangeInput';
import { Autocomplete } from '../Autocomplete';
import { DateInput } from '../DateInput';
import { CardInput } from '../CardInput';
import { FileInput } from '../FileInput';
import { Label } from '../Label';
import { Icon } from '../Icon';
import { isValidDate } from '../DatePicker/helpers';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';
import { DEFAULT_FORMAT } from '../DatePicker/constants';

storiesOf('Form controls/Input', module)
  .add('Examples', () => {
    const store = new Store({
      default: 'Default text',
      disabled: 'Disabled text',
      datePickerValue: '',
      monthPickerValue: new Date(),
      basic: '',
      prefix: '',
      success: '',
      notDetected: '1234567891234567',
      masterCard: '5234567891234567',
      visa: '4234567891234567',
      autocomplete: {},
      autocomplete1: {},
      autocomplete1Error: false,
      autocomplete2: {},
      empty: '',
      hasError: false,
      from: '',
      to: '',
      rangeHasError: {
        from: false,
        to: false,
      },
    });

    const defaultOptions = [
      { name: 'abcd 1', id: 1 },
      { name: 'abcd 2', id: 2 },
      { name: 'abcd 3', id: 3 },
      { name: 'abcd 4', id: 4 },
      { name: 'abcd 5', id: 5 },
      { name: 'abcd 6', id: 6 },
    ];

    const format = 'DD.MM.YYYY';

    function handleInputChange({ target }) {
      store.set({
        ...store.state,
        ...{
          [target.name]: target.value,
        },
      });
    }

    function handleAutocompleteInputChange({ target }) {
      store.set({
        ...store.state,
        ...{
          autocomplete1: target.value,
          autocomplete1Error: false,
        },
      });
    }

    function handleInputBlur(value) {
      const { state } = store;
      const { autocomplete1 } = state;
      if (!value) {
        store.set({
          ...state,
          autocomplete1: {},
          autocomplete1Error: false,
        });
      } else if (autocomplete1.value !== value) {
        store.set({
          ...state,
          autocomplete1Error: true,
        });
      }
    }

    function handleGetOptions(value) {
      return defaultOptions.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
        .map(option => (
          {
            id: option.id,
            value: option.name,
            label: (
              <div>
                Option Id -
                <span>{option.id}</span>
                , Name -
                <span>{option.name}</span>
              </div>
            ),
          }
        ));
    }

    function handleCardInputChange(target) {
      store.set({
        ...store.state,
        ...{
          [target.name]: target.value,
        },
      });
    }

    function handleDatePickerChange(event) {
      const { value } = event.target;

      const hasError = !isValidDate(value, format);
      store.set({
        datePickerValue: value,
        hasError,
      });
    }


    function handleDateRangePickerChange(date) {
      const { from, to } = date;
      const rangeHasError = {};
      if (from) {
        rangeHasError.from = !isValidDate(from, DEFAULT_FORMAT);
      }

      if (to) {
        rangeHasError.to = !isValidDate(to, DEFAULT_FORMAT);
      }
      const nextState = {
        ...store.state,
        ...date,
      };

      if (Object.keys(rangeHasError).length) {
        nextState.rangeHasError = {
          ...store.state.rangeHasError,
          ...rangeHasError,
        };
      }

      store.set(nextState);
    }

    function getOptionsFromGithub(value) {
      return fetch(`https://api.github.com/search/users?q=${value}+in:login&per_page=5`)
        .then(response => response.json())
        .then(data => data.items.map(user => (
          {
            value: user.login,
            label: user.login,
          }
        )))
        .catch(() => []);
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
                      name='dateInput'
                      format={format}
                      value={state.datePickerValue}
                      onChange={handleDatePickerChange}
                      hasError={state.hasError}
                    />
                  </Label>
                </Item>
              </ItemRow>
              <ItemRow>
                <Item>
                  <DateRangeInput
                    onChange={handleDateRangePickerChange}
                    from={state.from}
                    to={state.to}
                    hasError={state.rangeHasError}
                    label={{
                      from: 'From',
                      to: 'To',
                    }}
                  />
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
              title='Autocomplete'
            >
              <ItemRow>
                <Item>
                  <Autocomplete
                    onChange={handleInputChange}
                    value={state.autocomplete}
                    placeholder='Autocomplete'
                    name='autocomplete'
                    minCharsToSuggest={2}
                    getOptions={() => [
                      'abcd 1',
                      'adbc 2',
                      'acdb 3',
                      'abdc 4',
                      'acbd 5',
                      'dabc 6',
                    ].map(item => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </Item>
              </ItemRow>
              <ItemRow>
                <Item>
                  <Label>
                    Autocomplete with label
                    <Autocomplete
                      onChange={handleAutocompleteInputChange}
                      onBlur={handleInputBlur}
                      value={state.autocomplete1}
                      hasError={state.autocomplete1Error}
                      placeholder='Autocomplete with object options'
                      name='autocompleteWithObject'
                      errorHint='Please Select Option'
                      minCharsToSuggest={2}
                      getOptions={handleGetOptions}
                    />
                  </Label>
                </Item>
              </ItemRow>
              <ItemRow>
                <Item>
                  <Item>
                    <Autocomplete
                      getOptions={getOptionsFromGithub}
                      onChange={handleInputChange}
                      value={state.autocomplete2}
                      placeholder='Autocomplete 2'
                      name='autocomplete2'
                      minCharsToSuggest={2}
                    />
                  </Item>
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
                      onChange={handleCardInputChange}
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
                      onChange={handleCardInputChange}
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
                      onChange={handleCardInputChange}
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
                      onChange={handleCardInputChange}
                      value={state.masterCard}
                      name='masterCard'
                    />
                  </Label>
                </Item>
              </ItemRow>
            </ItemGroup>
            <ItemGroup
              title='File input'
            >
              <ItemRow>
                <Item>
                  <Label>
                    <FileInput>
                      <Icon
                        style={{ marginRight: '16px' }}
                        name='download'
                      />
                      Փոփոխել
                    </FileInput>
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
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='TextInput' />,
    },
  })
  .add('Password Input', () => (
    <TextInput type='password' />
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='TextInput' />,
    },
  });
