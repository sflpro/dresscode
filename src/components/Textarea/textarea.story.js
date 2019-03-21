import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { storiesOf } from '@storybook/react';

import { Textarea } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

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
            <ItemRow>
              <Item>
                <Textarea
                  label='Label'
                  name='basic'
                  value={state.basic}
                  onChange={handleTextareaChange}
                />
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Textarea
                  label='Label'
                  name='placeholder'
                  value={state.placeholder}
                  placeholder='Placeholder text'
                  onChange={handleTextareaChange}
                />
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Textarea
                  label='Label'
                  name='disabled'
                  value={state.disabled}
                  onChange={handleTextareaChange}
                  disabled
                />
              </Item>
            </ItemRow>
            <ItemRow>
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
            </ItemRow>
          </ItemGroup>
        }
      </State>
    )
  });
