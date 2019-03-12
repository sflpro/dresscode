import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { Checkbox } from '../Checkbox/index.js';
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
              checked={state.value === 'value1'}
              label='Ո՞վ աշխատի, նա կուտի'
              onChange={handler}
              name='value 1'
              value='value1'
            />
            <RadioButton
              checked={state.value === 'value2'}
              label='Էշ մի սատկի գարուն կգա'
              onChange={handler}
              value='value2'
              name='tes3'
            />
            <RadioButton
              label='Մեկ Դիզայնեռը անգամ շատա 10 պրոեկտ համար'
              checked={state.value === 'value3'}
              onChange={handler}
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
              checked={state.first}
              onChange={handler}
              label='Արագ'
              name='first'
            />
            <ToggleButton
              checked={state.second}
              onChange={handler}
              label='Որակով'
              name='second'
            />
            <ToggleButton
              label='Արագից տաս անգամ արագ'
              checked={state.third}
              onChange={handler}
              name='third'
            />
            <ToggleButton
              checked={state.fourth}
              onChange={handler}
              label='2 Դիզայնեռ'
              name='fourth'
            />
            <ToggleButton
              checked={state.fifth}
              onChange={handler}
              label='Մի հոգով'
              name='fifth'
            />
            <ToggleButton
              checked={state.sixth}
              label='Շաբաթ / Կիրակի'
              onChange={handler}
              name='sixth'
            />
          </ControlsGroup>,
        ]}
      </State>
    );
  });
