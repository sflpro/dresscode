import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, object, number } from '@storybook/addon-knobs';

import { Tooltip } from '.';

import { Icon } from '../Icon';

import { ItemGroup } from '../helpers/ItemGroup';
import { Item } from '../helpers/Item';
import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';

const longDescription = 'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and'
  + 'scrambled it to make a type specimen book. It has survived not only five centuries, but also the l';
const trackerStyle = {
  padding: '10px',
  backgroundColor: '#ccc',
  display: 'inline-block',
};
const fixedStyle = { ...trackerStyle, position: 'fixed' };
const leftStyle = { ...trackerStyle, left: '20%' };
const rightAbsoluteStyle = { ...trackerStyle, position: 'absolute', right: 0 };

storiesOf('Tooltip', module)
  .add('Examples', () => {
    const description = (
      <span>
        Content with component
        <Icon
          name='tracker'
        />
      </span>
    );

    return (
      <ItemGroup
        title='Tooltip'
      >
        <Item>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <Tooltip
              title='Position: top, trigger: click'
              description={longDescription}
              trigger='click'
            >
              <Icon
                name='tracker'
                style={trackerStyle}
              />
            </Tooltip>
          </div>
        </Item>
        <Item>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
            <Tooltip
              title='Position: top'
              description={longDescription}
            >
              <Icon
                name='tracker'
                style={trackerStyle}
              />
            </Tooltip>
          </div>
        </Item>
        <Item>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
            <Tooltip
              title='Target position: fixed, left: 20%'
              description={description}
              position='bottom'
            >
              <Icon
                name='tracker'
                style={{
                  ...fixedStyle,
                  ...leftStyle,
                }}
              />
            </Tooltip>
          </div>
        </Item>
        <Item>
          <br />
          <br />
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
            <Tooltip
              title='Target position: absolute, right: 0'
              description={description}
            >
              <Icon
                name='tracker'
                style={rightAbsoluteStyle}
              />
            </Tooltip>
          </div>
        </Item>
        <Item>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
            <Tooltip
              title='Follow: true'
              description={longDescription}
              follow
            >
              <Icon
                name='tracker'
                style={trackerStyle}
              />
            </Tooltip>
          </div>
        </Item>
      </ItemGroup>
    );
  })
  .add('Tooltip', () => {
    const text1 = text(
      'text1',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s'
      + 'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to'
      + 'make a type specimen book. It has survived not only five centuries, but also the leap',
    );

    const text2 = text(
      'text2',
      'nto electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release'
      + 'of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like'
      + 'Aldus PageMaker including versions of Lorem Ipsum.',
    );

    const description = text('description', longDescription);
    const iconStyle = object('iconStyle', trackerStyle);
    const iconName = text('iconName', 'tracker');
    const title = text('title', 'Follow: true');
    const position = text('position', 'top');
    const trigger = text('trigger', 'hover');
    const follow = boolean('follow', true);
    const arrow = boolean('arrow', true);
    const gap = number('gap', 0);

    return (
      <div>
        {text1}
        <Tooltip
          description={description}
          position={position}
          trigger={trigger}
          follow={follow}
          title={title}
          arrow={arrow}
          gap={gap}
        >
          <Icon
            style={iconStyle}
            name={iconName}
          />
        </Tooltip>
        {text2}
      </div>
    );
  }, {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Tooltip' />,
    },
  });
