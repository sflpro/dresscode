import React from 'react';
import { storiesOf } from '@storybook/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { text } from '@storybook/addon-knobs';

import { Button, CircleButton, LinkButton } from '.';

import { Icon } from '../Icon';

import { ItemGroup } from '../helpers/ItemGroup';
import { ItemRow } from '../helpers/ItemRow';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

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
    <>
      <ItemGroup
        title='Button'
      >
        <ItemRow>
          <Item>
            <Button
              type='submit'
            >
              Primary
            </Button>
          </Item>
          <Item>
            <Button
              secondary
            >
              Secondary 1
            </Button>
          </Item>
          <Item>
            <Button
              neutral
            >
              Secondary 2
            </Button>
          </Item>
          <Item>
            <Button
              warning
            >
              Negative
            </Button>
          </Item>
        </ItemRow>
      </ItemGroup>
      <ItemGroup
        title='Disabled Button'
      >
        <ItemRow>
          <Item>
            <Button
              secondary
              disabled
            >
              Secondary 1
            </Button>
          </Item>
          <Item>
            <Button
              disabled
            >
              Secondary 2
            </Button>
          </Item>
        </ItemRow>
      </ItemGroup>
      <ItemGroup
        title='Link Button'
      >
        <ItemRow>
          <Item>
            <LinkButton
              secondary
              as='a'
              target='_blank'
              href='https://sflpro.com/'
            >
              Primary
            </LinkButton>
          </Item>
          <Item>
            <LinkButton
              warning
              as={Anchor}
              target='_blank'
              href='https://sflpro.com/'
            >
              Negative
            </LinkButton>
          </Item>
        </ItemRow>
      </ItemGroup>
      <ItemGroup
        title='Disabled Link Button'
      >
        <ItemRow>
          <Item>
            <LinkButton
              disabled
            >
              Disabled
            </LinkButton>
          </Item>
        </ItemRow>
      </ItemGroup>
      <ItemGroup
        title='Circle Button'
      >
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
              neutral
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
      <ItemGroup
        title='Disabled Circle Button'
      >
        <ItemRow>
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
              secondary
              disabled
            >
              <Icon
                name='tracker'
                size={24}
              />
            </CircleButton>
          </Item>
        </ItemRow>
      </ItemGroup>
      <ItemGroup
        title='With Icon'
      >
        <ItemRow>
          <Item>
            <Button>
              <Icon
                name='tracker'
                size={24}
                style={styles.leftIcon}
              />
              Primary
            </Button>
          </Item>
          <Item>
            <Button
              secondary
            >
              <Icon
                name='tracker'
                size={24}
                style={styles.leftIcon}
              />
              Secondary 1
            </Button>
          </Item>
          <Item>
            <Button
              neutral
            >
              Secondary 2
              <Icon
                name='tracker'
                size={24}
                style={styles.rightIcon}
              />
            </Button>
          </Item>
          <Item>
            <Button
              warning
            >
              Negative
              <Icon
                name='tracker'
                size={24}
                style={styles.rightIcon}
              />
            </Button>
          </Item>
        </ItemRow>
      </ItemGroup>
    </>
  ))
  .add('Button', () => (
    <Button
      as={text('as', 'button')}
    >
      {text('children', 'Primary')}
    </Button>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Button' />,
    },
  });
