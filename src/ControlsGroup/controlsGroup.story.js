import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { ControlsGroup } from '.';

import { ToggleButton } from '../ToggleButton';
import { RadioButton } from '../RadioButton';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/CheckboxGroup', module)
  .add('Examples', () => {
    const store = new Store({
      first: true,
      second: true,
      third: false,
    });

    function handler({ target }) {
      store.set({
        ...store.state,
        ...{
          [target.name]: !store.state[target.name],
        },
      });
    }

    return (
      <State
        store={store}
      >
        {state => [
          <ItemGroup
            title='Checkbox group'
          >
            <Item>
              <ControlsGroup
                title='Question'
                key='key'
              >
                <Label
                  display='col'
                >
                  <Checkbox
                    checked={state.first}
                    name='first'
                    value='Option 1'
                    onChange={handler}
                  />
                  Option 1
                </Label>
                <Label
                  display='col'
                >
                  <Checkbox
                    checked={state.second}
                    name='second'
                    value='Option 2'
                    onChange={handler}
                  />
                  Option 2
                </Label>
                <Label
                  display='col'
                >
                  <Checkbox
                    checked={state.third}
                    name='third'
                    value='Option 3'
                    onChange={handler}
                  />
                  Option 3
                </Label>
              </ControlsGroup>
            </Item>
          </ItemGroup>,
        ]}
      </State>
    );
  })
  .add('CheckboxGroup', () => (
    <ControlsGroup
      title='Question'
      key='key'
    >
      <Label
        display='col'
      >
        <Checkbox
          checked
          name='first'
          value='Option 1'
        />
        Option 1
      </Label>
      <Label
        display='col'
      >
        <Checkbox
          checked
          name='second'
          value='Option 2'
        />
        Option 2
      </Label>
      <Label
        display='col'
      >
        <Checkbox
          name='third'
          value='Option 3'
        />
        Option 3
      </Label>
    </ControlsGroup>
  ), InfoStoryConfig);

storiesOf('Form controls/RadioButtonGroup', module)
  .add('Examples', () => {
    const store = new Store({
      value: 'value3',
    });

    function handler({ currentTarget }) {
      store.set({ value: currentTarget.value });
    }

    return (
      <State
        store={store}
      >
        {state => [
          <ItemGroup
            title='Radio button group'
          >
            <Item>
              <ControlsGroup
                title='Gender'
                key='key'
              >
                <Label
                  display='col'
                >
                  <RadioButton
                    checked={state.value === 'value1'}
                    onChange={handler}
                    name='value 1'
                    value='value1'
                  />
                  Male
                </Label>
                <Label
                  display='col'
                >
                  <RadioButton
                    checked={state.value === 'value2'}
                    onChange={handler}
                    value='value2'
                    name='tes3'
                  />
                  Female
                </Label>
                <Label
                  display='col'
                >
                  <RadioButton
                    checked={state.value === 'value3'}
                    onChange={handler}
                    value='value3'
                    name='tes3'
                  />
                  Other
                </Label>
              </ControlsGroup>
            </Item>
          </ItemGroup>,
        ]}
      </State>
    );
  })
  .add('RadioButtonGroup', () => (
    <ControlsGroup
      title='Gender'
      key='key'
    >
      <Label
        display='col'
      >
        <RadioButton
          name='value 1'
          value='value1'
        />
        Male
      </Label>
      <Label
        display='col'
      >
        <RadioButton
          value='value2'
          name='tes3'
        />
        Female
      </Label>
      <Label
        display='col'
      >
        <RadioButton
          checked
          value='value3'
          name='tes3'
        />
        Other
      </Label>
    </ControlsGroup>
  ), InfoStoryConfig);

storiesOf('Form controls/ToggleButtonGroup', module)
  .add('Examples', () => {
    const store = new Store({
      first: true,
      second: true,
      third: true,
      fourth: false,
      fifth: true,
      sixth: true,
    });

    function handler({ currentTarget }) {
      store.set({
        ...store.state,
        ...{
          [currentTarget.name]: !store.state[currentTarget.name],
        },
      });
    }

    return (
      <State
        store={store}
      >
        {state => [
          <ItemGroup
            title='Toggle button group'
          >
            <Item>
              <ControlsGroup
                title='Project Settings'
                style={{ width: '324px' }}
                key='key'
              >
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Option 1
                  <ToggleButton
                    checked={state.first}
                    onChange={handler}
                    name='first'
                  />
                </Label>
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Option 2
                  <ToggleButton
                    checked={state.second}
                    onChange={handler}
                    name='second'
                  />
                </Label>
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Option 3
                  <ToggleButton
                    checked={state.third}
                    onChange={handler}
                    name='third'
                  />
                </Label>
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Option 4
                  <ToggleButton
                    checked={state.fourth}
                    onChange={handler}
                    name='fourth'
                  />
                </Label>
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Option 5
                  <ToggleButton
                    checked={state.fifth}
                    onChange={handler}
                    name='fifth'
                  />
                </Label>
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Option 6
                  <ToggleButton
                    checked={state.sixth}
                    onChange={handler}
                    name='sixth'
                  />
                </Label>
              </ControlsGroup>
            </Item>
          </ItemGroup>,
        ]}
      </State>
    );
  })
  .add('ToggleButtonGroup', () => (
    <ControlsGroup
      title='Project Settings'
      style={{ width: '324px' }}
    >
      <Label
        display='col'
        style={{ justifyContent: 'space-between' }}
      >
        Option 1
        <ToggleButton
          checked
          name='first'
        />
      </Label>
      <Label
        display='col'
        style={{ justifyContent: 'space-between' }}
      >
        Option 2
        <ToggleButton
          checked
          name='second'
        />
      </Label>
      <Label
        display='col'
        style={{ justifyContent: 'space-between' }}
      >
        Option 3
        <ToggleButton
          name='third'
        />
      </Label>
      <Label
        display='col'
        style={{ justifyContent: 'space-between' }}
      >
        Option4
        <ToggleButton
          checked
          name='fourth'
        />
      </Label>
      <Label
        display='col'
        style={{ justifyContent: 'space-between' }}
      >
        Option 5
        <ToggleButton
          checked
          name='fifth'
        />
      </Label>
      <Label
        display='col'
        style={{ justifyContent: 'space-between' }}
      >
        Option 6
        <ToggleButton
          checked
          name='sixth'
        />
      </Label>
    </ControlsGroup>
  ), InfoStoryConfig);
