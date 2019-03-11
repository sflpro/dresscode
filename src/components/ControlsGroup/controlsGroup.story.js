import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Checkbox } from '../Checkbox/Checkbox.js';
import { ControlsGroup } from './index.js';
import { RadioButton } from '../RadioButton';
import { ToggleButton } from '../ToggleButton';


storiesOf('ControlsGroup', module)
  .add('CheckboxGroup', () => {
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
          <ControlsGroup
            title='Կուզենայիր աշխատեիր շաբաթ և կիրակի էս Սիսթեմի վրա'
            key='key'
          >
            <Checkbox
              label='Այո'
              checked={state.first}
              name='first'
              onChange={handler}
            />
            <Checkbox
              label='Ոչ'
              checked={state.second}
              name='second'
              onChange={handler}
            />
            <Checkbox
              label='Ճարս Ի՞նչ'
              checked={state.third}
              name='third'
              onChange={handler}
            />
          </ControlsGroup>,
        ]}
      </State>
    );
  })
  .add('RadioButtonGroup', () => {
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
          <ControlsGroup
            title='Ո՞րն է տվյալ պնդումներից ճիշտ'
            key='key'
          >
            <RadioButton
              isChecked={state.value === 'value1'}
              label='Ո՞վ աշխատի, նա կուտի'
              handleChange={handler}
              name='value 1'
              value='value1'
            />
            <RadioButton
              isChecked={state.value === 'value2'}
              label='Էշ մի սատկի գարուն կգա'
              handleChange={handler}
              value='value2'
              name='tes3'
            />
            <RadioButton
              label='Մեկ Դիզայնեռը անգամ շատա 10 պրոեկտ համար'
              isChecked={state.value === 'value3'}
              handleChange={handler}
              value='value3'
              name='tes3'
            />
          </ControlsGroup>,
        ]}
      </State>
    );
  })
  .add('ToggleButtonGroup', () => {
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
          <ControlsGroup
            title='Պրոեկտի պարամետրեր'
            style={{width: '324px'}}
            key='key'
          >
            <ToggleButton
              isChecked={state.first}
              handleChange={handler}
              label='Արագ'
              name='first'
            />
            <ToggleButton
              isChecked={state.second}
              handleChange={handler}
              label='Որակով'
              name='second'
            />
            <ToggleButton
              label='Արագից տաս անգամ արագ'
              isChecked={state.third}
              handleChange={handler}
              name='third'
            />
            <ToggleButton
              isChecked={state.fourth}
              handleChange={handler}
              label='2 Դիզայնեռ'
              name='fourth'
            />
            <ToggleButton
              isChecked={state.fifth}
              handleChange={handler}
              label='Մի հոգով'
              name='fifth'
            />
            <ToggleButton
              isChecked={state.sixth}
              handleChange={handler}
              label='Շաբաթ / Կիրակի'
              name='sixth'
            />
          </ControlsGroup>,
        ]}
      </State>
    );
  });
