import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { ItemGroup } from '../../helpers/ItemGroup';
import { SliderControl } from '../SliderControl';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';
import { Slider } from './index';

storiesOf('Slider', module)
  .add('Slider', () => {
    const store = new Store({
      test1: 75,
      test2: 36,
      test3: 55,
      min1: 25,
      max1: 50,
      min2: 16,
      max2: 74,
    });

    function handler({ name, value }) {
      store.set({
        ...store.state,
        [name]: value,
      });
    }

    return (
      <State
        store={store}
      >
        {state => (
          <ItemGroup>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler} min={5} step={5}>
                  <SliderControl name='test1' value={state.test1} icon='tracker' />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler} step={5}>
                  <SliderControl name='test3' value={state.test3} icon={<span>O</span>} />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler} step={3}>
                  <SliderControl name='test2' value={state.test2} />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler}>
                  <SliderControl
                    value={state.min1}
                    max={state.max1}
                    name='min1'
                  />
                  <SliderControl
                    value={state.max1}
                    min={state.min1}
                    name='max1'
                  />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler}>
                  <SliderControl
                    value={state.min2}
                    max={state.max2}
                    icon='warning'
                    name='min2'
                  />
                  <SliderControl
                    value={state.max2}
                    min={state.min2}
                    name='max2'
                    icon='eye'
                  />
                </Slider>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  });
