import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { CardInput } from '.';

import { Label } from '../Label';
import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

storiesOf('Form controls', module)
  .add('Card Input', () => {
    const store = new Store({
      notDetected: '1234567891234567',
      masterCard: '5234567891234567',
      visa: '4234567891234567',
      empty: '',
    });

    function handleInputChange({ name, value }) {
      store.set({
        ...store.state,
        ...{
          [name]: value,
        },
      });
    }

    return (
      <State
        store={store}
      >
        {state => (
          <ItemGroup
            title='Text input states'
          >
            <ItemRow>
              <Item>
                <Label>
                  Empty
                  <CardInput
                    onChange={handleInputChange}
                    value={state.empty}
                    name='empty'
                  />
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label>
                  Not Detected
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
                <Label>
                  Visa
                  <CardInput
                    onChange={handleInputChange}
                    value={state.visa}
                    name='visa'
                  />
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <Label>
                  MasterCard
                  <CardInput
                    onChange={handleInputChange}
                    value={state.masterCard}
                    name='masterCard'
                  />
                </Label>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  });
