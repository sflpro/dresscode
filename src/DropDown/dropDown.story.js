import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { object } from '@storybook/addon-knobs';

import { DropDown } from '.';

import { Option } from '../Option';
import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';
import { Button } from '../Button';

import { InfoStoryConfig } from '../configs';

storiesOf('Drop Down', module)
  .add('Examples', () => {
    const store = new Store({
      value: 'option1',
      isOpen: false,
    });

    function handleSelectChange(value, isOpen) {
      store.set({ isOpen, value });
    }

    function handleSelectClick() {
      store.set({ isOpen: !store.state.isOpen });
    }

    return (
      <State store={store}>
        {state => (
          <ItemGroup
            title='Select'
          >
            <ItemRow>
              <Item>
                <div style={{ width: '250px' }}>
                  <Label>
                    Label
                    <DropDown
                      onChange={handleSelectChange}
                      onClick={handleSelectClick}
                      value={state.value}
                      open={state.isOpen}
                      button={Button}
                    >
                      <Option
                        value='option1'
                        name='Option 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'
                      />
                      <Option
                        value='option2'
                        name='Option 2'
                      />
                      <Option
                        value='option3'
                        name='3'
                      />
                    </DropDown>
                  </Label>
                </div>
                sss
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('Drop Down', () => (
    <DropDown value={object('value')}>
      <Option
        value='option1'
        name='Option 1'
      />
      <Option
        value='option2'
        name='Option 2'
      />
      <Option
        value='option3'
        name='Option 3'
      />
      <Option
        value='option4'
        name='Option 4'
      />
    </DropDown>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Select' />,
    },
  });
