import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { number } from '@storybook/addon-knobs';

import { Slider } from '.';

import { Control } from '../Control';
import { Icon } from '../Icon';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Slider', module)
  .add('Examples', () => {
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
          <ItemGroup title='Slider'>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler} min={5} step={5}>
                  <Control name='test1' value={state.test1} icon={<Icon name='tracker' />} />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler} step={5}>
                  <Control name='test3' value={state.test3} icon={<span>O</span>} />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler} step={3}>
                  <Control
                    name='test2'
                    value={state.test2}
                    icon={(
                      <Icon
                        name='triangle'
                        style={{
                          filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
                          stroke: 'white',
                        }}
                      />
                    )}
                  />
                </Slider>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '40%' }}>
                <Slider onChange={handler}>
                  <Control
                    icon={(
                      <Icon
                        name='triangle'
                        style={{
                          filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
                          stroke: 'white',
                        }}
                      />
                    )}
                    value={state.min1}
                    max={state.max1}
                    name='min1'
                  />
                  <Control
                    icon={(
                      <Icon
                        name='triangle'
                        style={{
                          filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
                          stroke: 'white',
                        }}
                      />
                    )}
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
                  <Control
                    icon={<Icon name='warning' />}
                    value={state.min2}
                    max={state.max2}
                    name='min2'
                  />
                  <Control
                    icon={<Icon name='eye' />}
                    value={state.max2}
                    min={state.min2}
                    name='max2'
                  />
                </Slider>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('Slider', () => {
    const control1Value = number('control1Value', 16);
    const control2Value = number('control2Value', 74);

    return (
      <Slider onChange={params => params}>
        <Control
          icon={(
            <Icon
              name='triangle'
              style={{
                filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
                stroke: 'white',
              }}
            />
          )}
          value={control1Value}
          max={control2Value}
          name='min'
        />
        <Control
          icon={(
            <Icon
              name='triangle'
              style={{
                filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
                stroke: 'white',
              }}
            />
          )}
          value={control2Value}
          min={control1Value}
          name='max'
        />
      </Slider>
    )
  }, InfoStoryConfig);
