import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { Drawer } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { Button } from '../Button';

storiesOf('Drawer', module)
  .add('Examples', () => {
    const store = new Store({
      open: false,
    });

    function handleTargetClick(open) {
      store.set({
        ...store.state,
        open,
      });
    }

    return (
      <State
        store={store}
      >
        {state => (
          <ItemGroup
            title='Drawer'
          >
            <ItemRow>
              <Item>
                <Drawer
                  content={(
                    <div style={{
                      width: 200,
                      backgroundColor: '#f1f1f1',
                      height: '100%',
                    }}
                    >
                      Hi
                    </div>
                  )}
                  open={state.open}
                  onTargetClick={handleTargetClick}
                >
                  <Button>
                    Click
                  </Button>
                </Drawer>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  });
