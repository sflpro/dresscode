import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '.';

import { Anchor } from '../Anchor';
import { Icon } from '../Icon';
import { CircleButton } from '../CircleButton';
import { LinkButton } from '../LinkButton';
import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('Button', module)
  .add('Button', () => {
    const styles = {
      leftIcon: {
        marginRight: 16,
      },
      rightIcon: {
        marginLeft: 16,
      },
    };
    return (
      <ItemGroup
        title='Button'
      >
        <ItemRow>
          <Item>
            <Button
              type='submit'
            >
              Կոճակ
            </Button>
          </Item>
          <Item>
            <Button
              secondary
            >
              Կոճակ
            </Button>
          </Item>
          <Item>
            <Button
              neutral
            >
              Կոճակ
            </Button>
          </Item>
          <Item>
            <Button
              warning
            >
              Կոճակ
            </Button>
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button
              disabled
            >
              Կոճակ
            </Button>
          </Item>
          <Item>
            <Button
              secondary
              disabled
            >
              Կոճակ
            </Button>
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <LinkButton
              secondary
              as='a'
              target='_blank'
              href='https://sflpro.com/'
            >
              Կոճակ
            </LinkButton>
          </Item>
          <Item>
            <LinkButton
              warning
              as={Anchor}
              target='_blank'
              href='https://sflpro.com/'
            >
              Կոճակ
            </LinkButton>
          </Item>
          <Item>
            <LinkButton
              disabled
            >
              Կոճակ
            </LinkButton>
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button>
              <Icon
                name='tracker'
                size={24}
                style={styles.leftIcon}
              />
              Կոճակ
            </Button>
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <CircleButton>
              <Icon
                name='tracker'
                size={24}
              />
            </CircleButton>
          </Item>
          <Item>
            <CircleButton
              secondary
            >
              <Icon
                name='tracker'
                size={24}
              />
            </CircleButton>
          </Item>
          <Item>
            <CircleButton
              disabled
            >
              <Icon
                name='tracker'
                size={24}
              />
            </CircleButton>
          </Item>
          <Item>
            <CircleButton
              warning
            >
              <Icon
                name='tracker'
                size={24}
              />
            </CircleButton>
          </Item>
        </ItemRow>
      </ItemGroup>
    );
  });
