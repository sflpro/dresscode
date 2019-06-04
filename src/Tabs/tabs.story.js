import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Tabs } from '.';
import { Tab } from '../Tab';

import { ItemGroup } from '../helpers/ItemGroup';

storiesOf('Tabs', module)
  .add('Examples', () => {
    const store = new Store({
      value: 'tab-1',
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
                title='Tab 1'
                uniqueKey='tab-1'
              >
                Tab 1 Content
              </Tab>
              <Tab
                title='Tab2'
                uniqueKey='tab-2'
              >
                Tab 2 Content
              </Tab>
              <Tab
                title='Tab3'
                uniqueKey='tab-3'
              >
                Tab 3 Content
              </Tab>
              <Tab
                title='Tab 4'
                uniqueKey='tab-4'
              >
                Tab 4 Content
              </Tab>
            </Tabs>
          </ItemGroup>
        )}
      </State>
    );
  });
