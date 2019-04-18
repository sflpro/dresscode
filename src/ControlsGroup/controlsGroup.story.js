import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { ControlsGroup } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { ToggleButton } from '../ToggleButton';
import { RadioButton } from '../RadioButton';
import { InfoStoryConfig } from '../configs';
import { Item } from '../helpers/Item';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';

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
                title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա'
                key='key'
              >
                <Label
                  display='col'
                >
                  <Checkbox
                    checked={state.first}
                    name='first'
                    value='Այո'
                    onChange={handler}
                  />
                  Այո
                </Label>
                <Label
                  display='col'
                >
                  <Checkbox
                    checked={state.second}
                    name='second'
                    value='Ոչ'
                    onChange={handler}
                  />
                  Ոչ
                </Label>
                <Label
                  display='col'
                >
                  <Checkbox
                    checked={state.third}
                    name='third'
                    value='Ճարս Ի՞նչ'
                    onChange={handler}
                  />
                  Ճարս Ի՞նչ
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
      title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա'
      key='key'
    >
      <Checkbox
        label='Այո'
        checked
        name='first'
      />
      <Checkbox
        label='Ոչ'
        name='second'
      />
      <Checkbox
        label='Ճարս Ի՞նչ'
        checked
        name='third'
      />
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
                title='Ո՞րն է տվյալ պնդումներից ճիշտ'
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
                  Ո՞վ աշխատի, նա կուտի
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
                  Էշ մի սատկի գարուն կգա
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
                  Մեկ Դիզայնեռը անգամ շատա 10 պրոեկտ համար
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
      title='Ո՞րն է տվյալ պնդումներից ճիշտ'
      key='key'
    >
      <RadioButton
        label='Ո՞վ աշխատի, նա կուտի'
        name='value 1'
        value='value1'
      />
      <RadioButton
        label='Էշ մի սատկի գարուն կգա'
        value='value2'
        name='tes3'
      />
      <RadioButton
        label='Մեկ Դիզայնեռը անգամ շատա 10 պրոեկտ համար'
        value='value3'
        name='tes3'
        checked
      />
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
                title='Պրոեկտի պարամետրեր'
                style={{ width: '324px' }}
                key='key'
              >
                <Label
                  display='col'
                  style={{ justifyContent: 'space-between' }}
                >
                  Արագ
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
                  Որակով
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
                  Արագից տաս անգամ արագ
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
                  2 Դիզայնեռ
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
                  Մի հոգով
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
                  Շաբաթ / Կիրակի
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
      title='Պրոեկտի պարամետրեր'
      style={{ width: '324px' }}
    >
      <ToggleButton
        checked
        label='Արագ'
        name='first'
      />
      <ToggleButton
        checked
        label='Որակով'
        name='second'
      />
      <ToggleButton
        label='Արագից տաս անգամ արագ'
        checked
        name='third'
      />
      <ToggleButton
        label='2 Դիզայնեռ'
        name='fourth'
      />
      <ToggleButton
        checked
        label='Մի հոգով'
        name='fifth'
      />
      <ToggleButton
        checked
        label='Շաբաթ / Կիրակի'
        name='sixth'
      />
    </ControlsGroup>
  ), InfoStoryConfig);
