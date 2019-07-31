import React from 'react';
import { storiesOf } from '@storybook/react';

import { DropDown } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';
import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { Icon } from '../Icon';

import { InfoStoryConfig } from '../configs';
import { Button } from '../Button';

function onClickTest() {
  console.log('onClickTest');
}

storiesOf('Drop Down Button', module)
  .add('Examples', () => (
    <ItemGroup
      title='DropDown Button'
      style={{ height: '90vh' }}
    >
      <ItemRow style={{ justifyContent: 'space-between' }}>
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
  ))
  .add('Drop Down Button', () => (
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
        Toggle
        <Icon
          name='arrow-down'
          size={24}
        />
      </Button>
    </DropDown>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='DropDown' />,
    },
  });
