import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import { DropDown } from '.';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';
import { Button } from '../Button';
import { Icon } from '../Icon';

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
      console.log('onClickTest');
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
                    open={state.isOpen}
                  >
                    <DropDown.Toggle>
                      <Button>
                        Toggle
                        <Icon
                          name='arrow-down'
                          size={24}
                        />
                      </Button>
                    </DropDown.Toggle>

                    <DropDown.List>
                      <span>
                        Option 1
                      </span>
                      <span
                        role='presentation'
                        onClick={onClickTest}
                      >
                      Option 2 - onClick handler
                      </span>
                      <a
                        href='/#'
                        target='_blank'
                      >
                        Option 3
                      </a>
                    </DropDown.List>
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
    <DropDown>
      <DropDown.Toggle>
        <Button>
          Toggle
          <Icon
            name='arrow-down'
            size={24}
          />
        </Button>
      </DropDown.Toggle>

      <DropDown.List>
        <span>
          Option 1
        </span>
        <span>
          Option 2
        </span>
        <span>
          Option 3
        </span>
      </DropDown.List>
    </DropDown>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='DropDown' />,
    },
  });
