import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { text, boolean, withKnobs, select } from '@storybook/addon-knobs';

import { Select } from '.';

import { Option } from '../Option';
import { Button } from '../Button';
import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';


const selectedIcons = [
  'thick',
  'plus',
  'checked',
];

storiesOf('Form controls/Select', module)
  .add('Examples', () => {
    const store = new Store({
      value1: 'option1',
      value2: ['option1', 'option2', 'option4'],
      value3: 'option1',
      value4: ['option1', 'option3', 'option4'],
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

    function handleSelectChange3({ target }) {
      store.set({
        value3: target.value,
      });
    }

    function handleSelectChange4({ target }) {
      store.set({
        value4: target.value,
      });
    }

    function handleReset() {
      store.set({
        value2: ['option2'],
      });
    }

    return (
      <State store={store}>
        {state => (
          <ItemGroup
            style={{ height: '100%' }}
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
                        OptionOptionOptionOption123
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
                      <Option value='option7'>
                        Option 7
                      </Option>
                      <Option value='option8'>
                        Option 8
                      </Option>
                      <Option value='option9'>
                        Option 9
                      </Option>
                      <Option value='option10'>
                        Option 10
                      </Option>
                      <Option value='option11'>
                        Option 11
                      </Option>
                      <Option value='option12'>
                        Option 12
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
                <Button
                  style={{ marginTop: '8px' }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
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
                      onChange={handleSelectChange3}
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
                    onChange={handleSelectChange4}
                    value={state.value4}
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
  .add('Single - not selected', () => (
    <Select
      value={text('value', '')}
      onChange={() => null}
      hasError={boolean('hasError', false)}
      multiple={false}
      className={text('className', 'my-class')}
      disabled={boolean('disabled', false)}
      icon={select('icon', selectedIcons, 'thick')}
      placeholder={text('placeholder', 'no value selected')}
      name={text('name', 'select-1')}
    >
      <Option value='option1'>
        Option 1
      </Option>
      <Option value='option2'>
        Option 2
      </Option>
    </Select>
  ), {
    ...InfoStoryConfig,
    decorators: [withKnobs],
  })
  .add('Single - selected', () => (
    <Select
      value={text('value', 'option2')}
      onChange={() => null}
      hasError={boolean('hasError', false)}
      multiple={false}
      className={text('className', 'my-class')}
      disabled={boolean('disabled', false)}
      icon={select('icon', selectedIcons, 'thick')}
      placeholder={text('placeholder', 'no value selected')}
      name={text('name', 'select-1')}
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
    </Select>
  ), {
    ...InfoStoryConfig,
    decorators: [withKnobs],
  })
  .add('Multiple - not selected', () => {
    const store = new Store({
      value: [],
    });
    const handleSelectChange = ({ target }) => {
      store.set({
        value: target.value,
      });
    };

    return (
      <State store={store}>
        {state => (
          <Select
            multiple
            value={state.value}
            onChange={handleSelectChange}
            name={text('name', 'select-1')}
            hasError={boolean('hasError', false)}
            className={text('className', 'my-class')}
            disabled={boolean('disabled', false)}
            icon={select('icon', selectedIcons, 'thick')}
            placeholder={text('placeholder', 'no value selected')}
            nothingFoundText={text('nothingFoundText', 'nothing found ))))')}
            searchable
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
          </Select>
        )}
      </State>
    );
  }, {
    ...InfoStoryConfig,
    decorators: [withKnobs],
  })
  .add('Multiple - selected', () => {
    const store = new Store({
      value: ['option1', 'option2', 'option4'],
    });

    const handleSelectChange = ({ target }) => {
      store.set({
        value: target.value,
      });
    };

    return (
      <State store={store}>
        {state => (
          <Select
            multiple
            value={state.value}
            onChange={handleSelectChange}
            name={text('name', 'select-1')}
            hasError={boolean('hasError', false)}
            className={text('className', 'my-class')}
            disabled={boolean('disabled', false)}
            icon={select('icon', selectedIcons, 'thick')}
            placeholder={text('placeholder', 'no value selected')}
            nothingFoundText={text('nothingFoundText', 'nothing found ))))')}
            searchable
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
        )}
      </State>
    );
  }, {
    ...InfoStoryConfig,
    decorators: [withKnobs],
  })
  .add('Multiple - selected and disabled', () => {
    const store = new Store({
      value: ['option1', 'option2', 'option4'],
    });

    return (
      <State store={store}>
        {state => (
          <Select
            multiple
            value={state.value}
            onChange={() => null}
            name={text('name', 'select-1')}
            disabled
            searchable={false}
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
        )}
      </State>
    );
  }, {
    ...InfoStoryConfig,
    decorators: [withKnobs],
  })
  .add('Multiple - selected and not searchable', () => {
    const store = new Store({
      value: ['option1', 'option2', 'option4'],
    });

    const handleSelectChange = ({ target }) => {
      store.set({
        value: target.value,
      });
    };

    return (
      <State store={store}>
        {state => (
          <Select
            multiple
            value={state.value}
            onChange={handleSelectChange}
            searchable={false}
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
          </Select>
        )}
      </State>
    );
  }, {
    ...InfoStoryConfig,
    decorators: [withKnobs],
  });
