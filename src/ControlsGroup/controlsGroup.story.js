import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { boolean, text } from '@storybook/addon-knobs';

import { ControlsGroup } from '.';

import { ToggleButton } from '../ToggleButton';
import { RadioButton } from '../RadioButton';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

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
        {state => (
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
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('CheckboxGroup', () => {
    const checkbox1Label = text('checkbox1Label', 'Option 1');
    const checkbox1Name = text('checkbox1Name', 'first');
    const checkbox1Value = text('checkbox1Value', 'Option 1');
    const checkbox1Checked = boolean('checkbox1Checked', true);
    const checkbox1Disabled = boolean('checkbox1Disabled', false);

    const checkbox2Label = text('checkbox2Label', 'Option 2');
    const checkbox2Name = text('checkbox2Name', 'second');
    const checkbox2Value = text('checkbox2Value', 'Option 2');
    const checkbox2Checked = boolean('checkbox2Checked', true);
    const checkbox2Disabled = boolean('checkbox2Disabled', false);

    const checkbox3Label = text('checkbox3Label', 'Option 3');
    const checkbox3Name = text('checkbox3Name', 'third');
    const checkbox3Value = text('checkbox3Value', 'Option 3');
    const checkbox3Checked = boolean('checkbox3Checked', false);
    const checkbox3Disabled = boolean('checkbox3Disabled', false);

    return (
      <ControlsGroup
        title='Question'
      >
        <Label
          display='col'
        >
          <Checkbox
            disabled={checkbox1Disabled}
            checked={checkbox1Checked}
            value={checkbox1Value}
            name={checkbox1Name}
          />
          {checkbox1Label}
        </Label>
        <Label
          display='col'
        >
          <Checkbox
            disabled={checkbox2Disabled}
            checked={checkbox2Checked}
            value={checkbox2Value}
            name={checkbox2Name}
          />
          {checkbox2Label}
        </Label>
        <Label
          display='col'
        >
          <Checkbox
            disabled={checkbox3Disabled}
            checked={checkbox3Checked}
            value={checkbox3Value}
            name={checkbox3Name}
          />
          {checkbox3Label}
        </Label>
      </ControlsGroup>
    );
  }, {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='ControlsGroup' />,
    },
  });

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
        {state => (
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
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('RadioButtonGroup', () => {
    const radio1Label = text('radio1Label', 'Male');
    const radio1Name = text('radio1Name', 'gender');
    const radio1Value = text('radio1Value', 'male');
    const radio1Checked = boolean('radio1Checked', true);
    const radio1Disabled = boolean('radio1Disabled', false);

    const radio2Label = text('radio2Label', 'Female');
    const radio2Name = text('radio2Name', 'gender');
    const radio2Value = text('radio2Value', 'female');
    const radio2Checked = boolean('radio2Checked', false);
    const radio2Disabled = boolean('radio2Disabled', false);

    const radio3Label = text('radio3Label', 'Other');
    const radio3Name = text('radio3Name', 'gender');
    const radio3Value = text('radio3Value', 'other');
    const radio3Checked = boolean('radio3Checked', false);
    const radio3Disabled = boolean('radio3Disabled', false);

    return (
      <ControlsGroup
        title='Gender'
        key='key'
      >
        <Label
          display='col'
        >
          <RadioButton
            name={radio1Name}
            value={radio1Value}
            checked={radio1Checked}
            disabled={radio1Disabled}
          />
          {radio1Label}
        </Label>
        <Label
          display='col'
        >
          <RadioButton
            name={radio2Name}
            value={radio2Value}
            checked={radio2Checked}
            disabled={radio2Disabled}
          />
          {radio2Label}
        </Label>
        <Label
          display='col'
        >
          <RadioButton
            name={radio3Name}
            value={radio3Value}
            checked={radio3Checked}
            disabled={radio3Disabled}
          />
          {radio3Label}
        </Label>
      </ControlsGroup>
    );
  }, {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='ControlsGroup' />,
    },
  });

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
        {state => (
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
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('ToggleButtonGroup', () => {
    const toggle1Label = text('toggle1Label', 'Option 1');
    const toggle1Name = text('toggle1Name', 'first');
    const toggle1Checked = boolean('toggle1Checked', true);
    const toggle1Disabled = boolean('toggle1Disabled', false);

    const toggle2Label = text('toggle2Label', 'Option 2');
    const toggle2Name = text('toggle2Name', 'second');
    const toggle2Checked = boolean('toggle2Checked', false);
    const toggle2Disabled = boolean('toggle2Disabled', false);

    const toggle3Label = text('toggle3Label', 'Option 3');
    const toggle3Name = text('toggle3Name', 'third');
    const toggle3Checked = boolean('toggle3Checked', true);
    const toggle3Disabled = boolean('toggle3Disabled', false);

    return (
      <ControlsGroup
        title='Project Settings'
        style={{ width: '324px' }}
      >
        <Label
          display='col'
          style={{ justifyContent: 'space-between' }}
        >
          {toggle1Label}
          <ToggleButton
            disabled={toggle1Disabled}
            checked={toggle1Checked}
            name={toggle1Name}
          />
        </Label>
        <Label
          display='col'
          style={{ justifyContent: 'space-between' }}
        >
          {toggle2Label}
          <ToggleButton
            disabled={toggle2Disabled}
            checked={toggle2Checked}
            name={toggle2Name}
          />
        </Label>
        <Label
          display='col'
          style={{ justifyContent: 'space-between' }}
        >
          {toggle3Label}
          <ToggleButton
            disabled={toggle3Disabled}
            checked={toggle3Checked}
            name={toggle3Name}
          />
        </Label>
      </ControlsGroup>
    );
  }, {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='ControlsGroup' />,
    },
  });
