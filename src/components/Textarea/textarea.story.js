import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { Textarea } from '.';

import { ItemGroup } from '../ItemGroup';
import { Item } from '../Item';

storiesOf('Textarea', module)
  .add('Textarea', () => {
    const store = new Store({
      disabled: 'Disabled text',
    });

    function handleTextareaChange({ target }) {
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
            title='Textarea'
            style={{ maxWidth: 400 }}
          >
            <Item>
              <Textarea
                label='Label'
                name='basic'
                value={state.basic}
                onChange={handleTextareaChange}
              />
            </Item>
            <Item>
              <Textarea
                label='Label'
                name='placeholder'
                value={state.placeholder}
                placeholder='Placeholder text'
                onChange={handleTextareaChange}
              />
            </Item>
            <Item>
              <Textarea
                label='Label'
                name='disabled'
                value={state.disabled}
                onChange={handleTextareaChange}
                disabled
              />
            </Item>
            <Item>
              <Textarea
                label='Error'
                name='error'
                value={state.error}
                icon='warning'
                error='Error text'
                onChange={handleTextareaChange}
                hasError
              />
            </Item>
          </ItemGroup>
        }
      </State>
    )
  });
