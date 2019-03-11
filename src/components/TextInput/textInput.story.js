import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { TextInput } from '.';

import { Label } from '../Label';
import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('TextInput', module)
  .add('Text Input', () => {
    const store = new Store({
      default: 'Default text',
      disabled: 'Disabled text',
    });

    function handleInputChange({ target }) {
      store.set({
        ...store.state,
        ...{
          [target.name]: target.value,
        },
      });
    }

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Text Input'
          >
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
            <Item>
              <Label
                text='Success'
              >
                <TextInput
                  name='success'
                  value={state.success}
                  icon='check'
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
                  icon='warning'
                  error='Error text'
                  onChange={handleInputChange}
                  hasError
                />
              </Label>
            </Item>
          </ItemGroup>
        }
      </State>
    )
  });
