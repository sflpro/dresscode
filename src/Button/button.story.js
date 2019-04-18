import React from 'react';
import { storiesOf } from '@storybook/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button, CircleButton, LinkButton } from '.';

import { Icon } from '../Icon';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';

import { InfoStoryConfig } from '../configs';

const styles = {
  leftIcon: {
    marginRight: 16,
  },
  rightIcon: {
    marginLeft: 16,
  },
};

function Anchor({
  href,
  className,
  target,
  style,
  onClick,
  children,
  ...props
}) {
  const anchorClasses = classNames({
    [styles.anchor]: true,
    [className]: true,
  });
  return (
    <a
      href={href}
      className={anchorClasses}
      target={target}
      rel='noopener noreferrer'
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

Anchor.defaultProps = {
  className: '',
  target: '_blank',
  style: {},
  onClick: undefined,
  children: null,
};

storiesOf('Button', module)
  .add('Examples', () => (
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
  ))
  .add('Button', () => (
    <Button
      type='submit'
    >
      Կոճակ
    </Button>
  ), InfoStoryConfig);
