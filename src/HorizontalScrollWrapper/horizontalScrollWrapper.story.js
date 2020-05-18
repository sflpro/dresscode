import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { HorizontalScrollWrapper } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { Icon } from '../Icon';
import { Tabs } from '../Tabs';
import { Tab } from '../Tab';

import '../Icon/svgSprite.icon.svg';

storiesOf('Horizontall Scroll', module)
  .add('Examples', () => {
    const store1 = new Store({
      value: 0,
    });

    function handleChange1(index) {
      store1.set({
        value: index,
      });
    }

    const store2 = new Store({
      value: 0,
    });

    function handleChange2(index) {
      store1.set({
        value: index,
      });
    }

    return (
      <>
        <ItemGroup
          title='Simple'
        >
          <HorizontalScrollWrapper
            icon={<Icon name='arrow-left' size={24} />}
            endIcon={<Icon name='warning' size={24} />}
          >
            <State store={store1}>
              {state => (
                <Tabs
                  value={state.value}
                  identifier='index'
                  onChange={handleChange1}
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
                  >
                    Tab Three
                  </Tab>
                  <Tab
                    index={3}
                  >
                    Tab Four
                  </Tab>
                  <Tab
                    index={4}
                  >
                    Tab Five
                  </Tab>
                  <Tab
                    index={5}
                  >
                    Tab Six
                  </Tab>
                  <Tab
                    index={6}
                  >
                    Tab Seven
                  </Tab>
                  <Tab
                    index={7}
                  >
                    Tab Eight
                  </Tab>
                  <Tab
                    index={8}
                  >
                    Tab Nine
                  </Tab>
                  <Tab
                    index={9}
                  >
                    Tab Ten
                  </Tab>
                </Tabs>
              )}
            </State>
          </HorizontalScrollWrapper>
        </ItemGroup>
        <ItemGroup
          title='With big scroll step'
        >
          <HorizontalScrollWrapper
            icon={<Icon name='arrow-left' size={24} />}
            scrollStepWidth={500}
          >
            <State store={store2}>
              {state => (
                <Tabs
                  value={state.value}
                  identifier='index'
                  onChange={handleChange2}
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
                  >
                    Tab Three
                  </Tab>
                  <Tab
                    index={3}
                  >
                    Tab Four
                  </Tab>
                  <Tab
                    index={4}
                  >
                    Tab Five
                  </Tab>
                  <Tab
                    index={5}
                  >
                    Tab Six
                  </Tab>
                  <Tab
                    index={6}
                  >
                    Tab Seven
                  </Tab>
                  <Tab
                    index={7}
                  >
                    Tab Eight
                  </Tab>
                  <Tab
                    index={8}
                  >
                    Tab Nine
                  </Tab>
                  <Tab
                    index={9}
                  >
                    Tab Ten
                  </Tab>
                </Tabs>
              )}
            </State>
          </HorizontalScrollWrapper>
        </ItemGroup>
        <ItemGroup
          title='With initial scroll position'
        >
          <HorizontalScrollWrapper
            icon={<Icon name='arrow-left' size={24} />}
            scrollPos={250}
          >
            <Tabs
              value={2}
              identifier='index'
              onChange={handleChange1}
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
              >
                Tab Three
              </Tab>
              <Tab
                index={3}
              >
                Tab Four
              </Tab>
              <Tab
                index={4}
              >
                Tab Five
              </Tab>
              <Tab
                index={5}
              >
                Tab Six
              </Tab>
              <Tab
                index={6}
              >
                Tab Seven
              </Tab>
              <Tab
                index={7}
              >
                Tab Eight
              </Tab>
              <Tab
                index={8}
              >
                Tab Nine
              </Tab>
              <Tab
                index={9}
              >
                Tab Ten
              </Tab>
            </Tabs>
          </HorizontalScrollWrapper>
        </ItemGroup>
      </>
    );
  });
