import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';
import { Label } from '../Label';
import { CardInput } from '.';

storiesOf('CardInput', module)
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
            </ItemRow>
            <ItemRow>
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
            </ItemRow>
            <ItemRow>
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
        )}
      </State>
    );
  });
