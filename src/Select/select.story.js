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
      value3: 'option3',
      isOpen3: false,
    });

    function handleSelectChange1(value1, isOpen1) {
      store.set({
        isOpen1,
        value1,
      });
    }

    function handleSelectClick1() {
      store.set({ isOpen1: !store.state.isOpen1 });
    }

    function handleSelectChange2(value2, isOpen2) {
      store.set({
        isOpen2,
        value2,
      });
    }

    function handleSelectClick2() {
      store.set({ isOpen2: !store.state.isOpen2 });
    }

    function handleSelectChange3(value3, isOpen3) {
      store.set({
        isOpen3,
        value3,
      });
    }

    function handleSelectClick3() {
      store.set({ isOpen3: !store.state.isOpen3 });
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
                    Label 1
                    <Select
                      onChange={handleSelectChange1}
                      onClick={handleSelectClick1}
                      value={state.value1}
                      open={state.isOpen1}
                    >
                      <Option value='option1'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                      </Option>
                      <Option value='option2'>
                        Option 2
                      </Option>
                      <Option value='option3'>
                        Option 3
                      </Option>
                    </Select>
                  </Label>
                </div>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item>
                <div style={{ width: '250px' }}>
                  <Label>
                    Label 2
                    <Select
                      onChange={handleSelectChange3}
                      onClick={handleSelectClick3}
                      value={state.value3}
                      open={state.isOpen3}
                      button={Button}
                      buttonProps={{
                        secondary: true,
                      }}
                    >
                      <Option value='option1'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                      </Option>

                      <Option value='option2'>
                        Option 2
                      </Option>
                      <Option value='option3'>
                        3
                      </Option>
                    </Select>
                  </Label>
                </div>
              </Item>
            </ItemRow>

            <ItemRow>
              <Item style={{ width: '375px' }}>
                <Label>
                  MultiSelect Label
                  <Select
                    onChange={handleSelectChange2}
                    onClick={handleSelectClick2}
                    value={state.value2}
                    open={state.isOpen2}
                    placeholder='Type Option'
                    multiple
                  >
                    <Option value='option1'>
                      Option 1
                    </Option>
                    <Option value='option2'>
                      Option 2
                    </Option>
                    <Option value='option3'>
                      Option 3
                    </Option>
                    <Option value='option4'>
                      Option 4
                    </Option>
                    <Option value='option5'>
                      Option 5
                    </Option>
                    <Option value='option6'>
                      Option 6
                    </Option>
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
