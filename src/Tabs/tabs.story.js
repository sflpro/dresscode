import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Tabs } from '.';
import { Tab } from '../Tab';
import { TabContent } from '../TabContent';

import { ItemGroup } from '../helpers/ItemGroup';

storiesOf('Tabs', module)
  .add('Examples', () => {
    const store = new Store({
      value: 0,
    });

    function handleChange(index) {
      store.set({
        value: index,
      });
    }

    return (
      <State store={store}>
        {state => (
          <ItemGroup
            title='Tabs'
          >
            <Tabs
              value={state.value}
              onChange={handleChange}
            >
              <Tab
                index={0}
                title='Tab One'
              />
              <Tab
                index={1}
                title='Tab Two'
              />
              <Tab
                index={2}
                title='Tab Three'
                disabled
              />
              <Tab
                index={3}
                title='Tab Four'
              />
            </Tabs>
            {state.value === 0 && <TabContent>Tab Content One</TabContent>}
            {state.value === 1 && <TabContent>Tab Content Two</TabContent>}
            {state.value === 2 && <TabContent>Tab Content Three</TabContent>}
            {state.value === 3 && <TabContent>Tab Content Four</TabContent>}
          </ItemGroup>
        )}
      </State>
    );
  });
