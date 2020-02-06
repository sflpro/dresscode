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
                      height: '100%',
                    }}
                    >
                      Hi
                    </div>
                  )}
                  open={state.open}
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
