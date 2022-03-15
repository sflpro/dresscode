import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import { DropDown } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';
import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { InfoStoryConfig } from '../configs';

storiesOf('DropDown', module)
  .add('Examples', () => {
    const store = new Store({
      isDropDownOpen: false,
    });

    function onClickTest() {
      console.log('onClickTest');
      store.set({
        ...store.state,
        isDropDownOpen: false,
      });
    }

    function onStateChange(isOpen) {
      store.set({
        ...store.state,
        isDropDownOpen: isOpen,
      });
    }

    return (
      <State
        store={store}
      >
        {state => (
          <ItemGroup
            title='DropDown'
            style={{ height: '90vh' }}
          >
            <ItemRow style={{ justifyContent: 'space-between' }}>
              <Item>
                <DropDown
                  open={state.isDropDownOpen}
                  options={(
                    <DropDown.Options>
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
                    </DropDown.Options>
                  )}
                  onStateChange={onStateChange}
                >
                  <Button>
                    Toggle L.
                    <Icon
                      name='arrow-down'
                      size={24}
                    />
                  </Button>
                </DropDown>
              </Item>
              <Item>
                <DropDown
                  options={(
                    <DropDown.Options>
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
                    </DropDown.Options>
                  )}
                >
                  <Button>
                    Toggle R.
                    <Icon
                      name='arrow-down'
                      size={24}
                    />
                  </Button>
                </DropDown>
              </Item>
            </ItemRow>
            <ItemRow style={{ justifyContent: 'space-between', marginTop: 'auto' }}>
              <Item>
                <DropDown
                  watchTargetDimensions
                  options={(
                    <DropDown.Options>
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
                    </DropDown.Options>
                  )}
                >
                  <Button>
                    Toggle L. T.
                    <Icon
                      name='arrow-down'
                      size={24}
                    />
                  </Button>
                </DropDown>
              </Item>
              <Item>
                <DropDown
                  watchTargetDimensions
                  options={(
                    <DropDown.Options>
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
                    </DropDown.Options>
                  )}
                >
                  <Button>
                    Toggle R. T.
                    <Icon
                      name='arrow-down'
                      size={24}
                    />
                  </Button>
                </DropDown>
              </Item>
            </ItemRow>
          </ItemGroup>
        )}
      </State>
    );
  })
  .add('Drop Down', () => {
    function onClickTest() {
      console.log('onClickTest');
    }

    return (
      <DropDown
        watchTargetDimensions
        options={(
          <DropDown.Options>
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
          </DropDown.Options>
        )}
      >
        <Button>
          Toggle
          <Icon
            name='arrow-down'
            size={24}
          />
        </Button>
      </DropDown>
    );
  },
  {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='DropDown' />,
    },
  });
