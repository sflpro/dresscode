import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Select } from '.';

import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';
import { Option } from '../Option';
import { Label } from '../Label';

import styles from "../TextInput/textInput.css";

storiesOf('Form controls', module)
  .add('Select', () => {
    const store = new Store({
      value1: 'option1',
      isOpen1: false,
      value2: ['option1', 'option2', 'option4'],
      isOpen2: false,
    });

    function handleSelectChange1(value1, isOpen1) {
      store.set({ isOpen1, value1 });
    }

    function handleSelectClick1() {
      store.set({ isOpen1: !store.state.isOpen1 });
    }

    function handleSelectChange2(value2, isOpen2) {
      store.set({ isOpen2, value2 });
    }

    function handleSelectClick2() {
      store.set({ isOpen2: !store.state.isOpen2 });
    }

    return (
      <State store={store}>
        {state => (
          <ItemGroup
            title='Select'
          >
            <ItemRow>
              <Item>
                <Label>
                  <span className={styles.label}>Label</span>
                  <Select
                    onChange={handleSelectChange1}
                    onClick={handleSelectClick1}
                    value={state.value1}
                    open={state.isOpen1}
                  >
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
                  </Select>
                </Label>
              </Item>
            </ItemRow>
            <ItemRow>
              <Item style={{ width: '375px' }}>
                <Label>
                  <span className={styles.label}>Label</span>
                  <Select
                    onChange={handleSelectChange2}
                    onClick={handleSelectClick2}
                    value={state.value2}
                    open={state.isOpen2}
                    placeholder='Տեքստ'
                    multiple
                  >
                    <Option
                      value='option1'
                      name='Pit 1'
                    />
                    <Option
                      value='option4'
                      name='Pi Եվ ինձ լսելով՝ Կարող են ասել. «Գժվե՞լ է, ի՜նչ է». «Այո՛, գժվե՜լ եմ, Ինչո՞ւ չգժվել»:'
                    />
                    <Option
                      value='option2'
                      name='Pita 2'
                    />
                    <Option
                      value='option3'
                      name='Pitak 3'
                    />
                  </Select>
                </Label>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  });
