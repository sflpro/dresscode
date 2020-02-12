import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { InfiniteScroll } from '.';

import { ItemGroup } from '../helpers/ItemGroup';

import '../Icon/svgSprite.icon.svg';

storiesOf('Infinite Scroll', module)
  .add('Examples', () => {
    const store1 = new Store({
      items: [],
      hasMoreItems: true,
      isLoading: false,
      page: 1,
    });

    const store2 = new Store({
      items: [],
      hasMoreItems: true,
      isLoading: false,
      page: 1,
    });

    function getRandomItems(page) {
      const items = new Array(20);
      return items.fill(page).map(item => (`${item}_${Math.random()}`));
    }

    function loadItems() {
      if (store1.state.isLoading) {
        return;
      }

      store1.set({
        isLoading: true,
      });
      setTimeout(() => {
        store1.set({
          items: [...store1.state.items, ...getRandomItems(store1.state.page)],
          hasMoreItems: true,
          isLoading: false,
          page: store1.state.page + 1,
        });
      }, 1000);
    }

    function loadReverseItems() {
      if (store2.state.isLoading) {
        return;
      }

      store2.set({
        isLoading: true,
      });
      setTimeout(() => {
        store2.set({
          items: [...getRandomItems(store2.state.page), ...store2.state.items],
          hasMoreItems: true,
          isLoading: false,
          page: store2.state.page + 1,
        });
      }, 3000);
    }

    const loader = <div>Loading ...</div>;

    return (
      <>
        <ItemGroup title='Simple'>
          <State store={store1}>
            {state => (
              <div
                style={{
                  height: 700,
                  overflow: 'auto',
                }}
              >
                <InfiniteScroll
                  pageStart={0}
                  loadMore={loadItems}
                  hasMore={state.hasMoreItems}
                  loader={loader}
                >
                  <div>
                    {state.items.map(item => (
                      <div
                        style={{
                          width: 200,
                          height: 25,
                          textAlign: 'center',
                          margin: '8px',
                          borderRadius: '8px',
                          padding: '16px',
                          backgroundColor: 'gray',
                        }}
                        key={item}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {state.isLoading && loader}
                </InfiniteScroll>
              </div>
            )}
          </State>
        </ItemGroup>
        <ItemGroup title='With reverse'>
          <State store={store2}>
            {state => (
              <div
                style={{
                  height: 700,
                  overflow: 'auto',
                }}
              >
                <InfiniteScroll
                  pageStart={0}
                  loadMore={loadReverseItems}
                  hasMore={state.hasMoreItems}
                  useWindow={false}
                  loader={loader}
                  reverse
                >
                  {state.isLoading && loader}
                  <div>
                    {state.items.map(item => (
                      <div
                        style={{
                          width: 200,
                          height: 25,
                          textAlign: 'center',
                          margin: '8px',
                          borderRadius: '8px',
                          padding: '16px',
                          backgroundColor: 'gray',
                        }}
                        key={item}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </State>
        </ItemGroup>
      </>
    );
  });
