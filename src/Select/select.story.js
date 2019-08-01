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

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Select', module)
  .add('Examples', () => {
    const store = new Store({
      value1: 'option1',
      value2: ['option1', 'option2', 'option4'],
    });

    function handleSelectChange1({ target }) {
      store.set({
        value1: target.value,
      });
    }

    function handleSelectChange2({ target }) {
      store.set({
        value2: target.value,
      });
    }

    return (
      <State store={store}>
        {state => (
          <ItemGroup
            style={{ height: '90vh' }}
            title='Select'
          >
            <ItemRow>
              <Item>
                <div style={{ width: '250px' }}>
                  <Label>
                    Label 1
                    <Select
                      onChange={handleSelectChange1}
                      value={state.value1}
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
              <Item style={{ width: '375px' }}>
                <Label>
                  MultiSelect Label 1
                  <Select
                    onChange={handleSelectChange2}
                    value={state.value2}
                    placeholder='Type Option'
                    multiple
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
            <ItemRow
              style={{ marginTop: 'auto' }}
            >
              <Item>
                <div style={{ width: '250px' }}>
                  <Label>
                    Label 2
                    <Select
                      onChange={handleSelectChange1}
                      value={state.value1}
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
              <Item style={{ width: '375px' }}>
                <Label>
                  MultiSelect Label 2
                  <Select
                    onChange={handleSelectChange2}
                    value={state.value2}
                    placeholder='Type Option'
                    multiple
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
