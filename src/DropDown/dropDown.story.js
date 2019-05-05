import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { DropDown } from '.';

import { Label } from '../Label';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';
import { Button } from '../Button';

import { InfoStoryConfig } from '../configs';

storiesOf('Drop Down', module)
  .add('Examples', () => {
    const store = new Store({
      isOpen: false,
    });

    function handleSelectClick() {
      store.set({ isOpen: !store.state.isOpen });
    }

    function onClickTest() {
      alert();
    }

    return (
      <State store={store}>
        {state => (
          <ItemGroup
            title='Select'
          >
            <ItemRow>
              <Item>
                <div style={{ width: '250px' }}>
                  <DropDown
                    onClick={handleSelectClick}
                    button={Button}
                    open={state.isOpen}
                    label='Menu button'
                  >
                    <div>
                      Option 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                    </div>
                    <span
                      role='presentation'
                      onClick={onClickTest}
                    >
                      Option 2 - onClick handler
                    </span>
                    <span>
                      Option 3
                    </span>
                  </DropDown>
                </div>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('Drop Down', () => (
    <DropDown
      label='Dropdown menu'
      button={Button}
    >
      <div>
        Option 1
      </div>
      <span
        role='presentation'
        onClick={() => alert()}
      >
        Option 2
      </span>
      <a href='/#'>
        Option 3
      </a>
    </DropDown>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='DropDown' />,
    },
  });
