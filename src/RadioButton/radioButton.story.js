import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';

import { RadioButton } from '.';

import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';

const store = new Store({
  radio: 'radio4',
});

function handler({ target }) {
  store.set({
    ...store.state,
    ...{
      [target.name]: target.value,
    },
  });
}

storiesOf('Form controls/Radio Button', module)
  .add('Examples', () => (
    <State store={store}>
      {state => (
        <ItemGroup
          title='Radio Button'
        >
          <ItemRow>
            <Item>
              <Label
                display='col'
              >
                <RadioButton
                  checked={state.radio === 'radio1'}
                  onChange={handler}
                  value='radio1'
                  name='radio'
                />
                Option 1
              </Label>
            </Item>
          </ItemRow>
          <ItemRow>
            <Item>
              <Label
                display='col'
              >
                <RadioButton
                  checked={state.radio === 'radio2'}
                  onChange={handler}
                  value='radio2'
                  name='radio'
                />
                Option 2
              </Label>
            </Item>
          </ItemRow>
          <ItemRow>
            <Item>
              <Label
                display='col'
                disabled
              >
                <RadioButton
                  checked={state.radio === 'radio3'}
                  onChange={handler}
                  value='radio3'
                  name='radio'
                  disabled
                />
                Disabled
              </Label>
            </Item>
          </ItemRow>
          <ItemRow>
            <Item>
              <Label
                display='col'
                disabled
              >
                <RadioButton
                  checked={state.radio === 'radio4'}
                  onChange={handler}
                  value='radio4'
                  name='radio'
                  disabled
                />
                Active Disabled
              </Label>
            </Item>
          </ItemRow>
        </ItemGroup>
      )}
    </State>
  ))
  .add('Radio Button', () => (
    <RadioButton />
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction text='RadioButton' />,
    },
  });
