import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { Textarea } from '.';
import { Label } from '../Label';
import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

storiesOf('Form controls', module)
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
        {state => (
          <ItemGroup
            title='Textarea'
            style={{ maxWidth: 400 }}
          >
            <ItemRow>
              <Item>
                <Label>
                  Label
                  <Textarea
                    name='basic'
                    value={state.basic}
                    onChange={handleTextareaChange}
                  />
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label>
                  Label
                  <Textarea
                    name='placeholder'
                    value={state.placeholder}
                    placeholder='Placeholder text'
                    onChange={handleTextareaChange}
                  />
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label>
                  Label
                  <Textarea
                    name='disabled'
                    value={state.disabled}
                    onChange={handleTextareaChange}
                    disabled
                  />
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label
                  hasError
                >
                  Error
                  <Textarea
                    name='error'
                    value={state.error}
                    icon='warning'
                    error='Error text'
                    onChange={handleTextareaChange}
                    hasError
                  />
                </Label>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  });
