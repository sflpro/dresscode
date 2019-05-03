import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { object } from '@storybook/addon-knobs';

import { Select } from '.';

import { Option } from '../Option';
import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';
import { Button } from '../Button';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Select', module)
  .add('Examples', () => {
    const store = new Store({
      value1: 'option1',
      isOpen1: false,
      value2: ['option1', 'option2', 'option4'],
      isOpen2: false,
    });

    function handleSelectChange1(value1, isOpen1) {
      store.set({ isOpen1, value1 });
    }

    function handleSelectClick1() {
      store.set({ isOpen1: !store.state.isOpen1 });
    }

    function handleSelectChange2(value2, isOpen2) {
      store.set({ isOpen2, value2 });
    }

    function handleSelectClick2() {
      store.set({ isOpen2: !store.state.isOpen2 });
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
                    <Select
                      onChange={handleSelectChange1}
                      onClick={handleSelectClick1}
                      value={state.value1}
                      open={state.isOpen1}
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
                        name='Option 3'
                      />
                    </Select>
                  </Label>
                </div>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '375px' }}>
                <Label>
                  Label
                  <Select
                    onChange={handleSelectChange2}
                    onClick={handleSelectClick2}
                    value={state.value2}
                    open={state.isOpen2}
                    placeholder='Type Option'
                    multiple
                  >
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
                    <Option
                      value='option5'
                      name='Option 5'
                    />
                    <Option
                      value='option6'
                      name='Option 6'
                    />
                  </Select>
                </Label>
              </Item>
            </ItemRow>

          </ItemGroup>
        )}
      </State>
    );
  })
  .add('Select', () => (
    <Select value={object('value')}>
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
    </Select>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Select' />,
    },
  });
