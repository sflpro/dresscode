import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { TextInput } from '.';

import { ItemGroup } from '../ItemGroup';
import { Item } from '../Item';

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
            style={{ maxWidth: 300 }}
          >
            <Item>
              <TextInput
                label='Label'
                name='basic'
                value={state.basic}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <TextInput
                label='Label'
                name='default'
                value={state.default}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <TextInput
                label='Label'
                name='placeholder'
                value={state.placeholder}
                placeholder='Placeholder text'
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <TextInput
                label='Label'
                name='disabled'
                value={state.disabled}
                onChange={handleInputChange}
                disabled
              />
            </Item>
            <Item>
              <TextInput
                label='Password'
                name='password'
                value={state.password}
                type='password'
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <TextInput
                label='Label'
                name='prefix'
                value={state.prefix}
                prefix='+374'
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <TextInput
                label='Success'
                name='success'
                value={state.success}
                icon='check'
                onChange={handleInputChange}
                isValid
              />
            </Item>
            <Item>
              <TextInput
                label='Error'
                name='error'
                value={state.error}
                icon='warning'
                error='Error text'
                onChange={handleInputChange}
                hasError
              />
            </Item>
          </ItemGroup>
        }
      </State>
    )
  });
