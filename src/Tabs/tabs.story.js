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
      link: '/',
    });

    function handleChange(index) {
      store.set({
        value: index,
      });
    }

    function handleLinkChange(index) {
      store.set({
        link: index,
      });
    }

    return (
      <State store={store}>
        {state => (
          <>
            <ItemGroup
              title='Tabs'
            >
              <Tabs
                value={state.value}
                identifier='index'
                onChange={handleChange}
              >
                <Tab
                  index={0}
                >
                  Tab One
                </Tab>
                <Tab
                  index={1}
                >
                  Tab Two
                </Tab>
                <Tab
                  index={2}
                  disabled
                >
                  Tab Three
                </Tab>
                <Tab
                  index={3}
                >
                  Tab Four
                </Tab>
              </Tabs>
              {state.value === 0 && <TabContent>Tab Content One</TabContent>}
              {state.value === 1 && <TabContent>Tab Content Two</TabContent>}
              {state.value === 2 && <TabContent>Tab Content Three</TabContent>}
              {state.value === 3 && <TabContent>Tab Content Four</TabContent>}
            </ItemGroup>
            <ItemGroup
              title='Link Tabs'
            >
              <Tabs
                value={state.link}
                identifier='link'
                onChange={handleLinkChange}
              >
                <Tab
                  link='/'
                >
                  Exact path
                </Tab>
                <Tab
                  link='/home'
                  matchPartially
                >
                  Home page
                </Tab>
                <Tab
                  link='/home'
                  disabled
                >
                  Home page
                </Tab>
                <Tab
                  link='/home/nested'
                  matchPartially
                >
                  Home page nested
                </Tab>
              </Tabs>
              {state.link === '/' && <TabContent>Tab Content One</TabContent>}
              {state.link === '/active-by-default' && <TabContent>Tab Content Two</TabContent>}
              {state.link === '/home' && <TabContent>Tab Content Three</TabContent>}
              {state.link === '/home/nested' && <TabContent>Tab Content Four</TabContent>}
            </ItemGroup>
          </>
        )}
      </State>
    );
  });
