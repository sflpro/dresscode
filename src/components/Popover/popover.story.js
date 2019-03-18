import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { ItemGroup } from '../../helpers/ItemGroup';
import { Item } from '../../helpers/Item';
import { DateInput } from '../DateInput';

storiesOf('Popover', module)
  .add('Date picker', () => {
    const store = new Store({
      datePickerValue: '25-12-2019',
    });

    function handleDateInputChange({ target }) {
      store.set({
        datePickerValue: target.value,
      });
    }

    function handleDatePickerChange(datePickerValue) {
      store.set({
        datePickerValue,
      });
    }

    return (
      <State
        store={store}
      >
        {state =>
          <ItemGroup
            title='Dropdown'
          >
            <Item>

              <div>

                sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf
                sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf
                sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf
                sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf
                sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf sdfdsfsdf dsfsdfsdf sadasdasdas sadasdsad dcsdfdsfsdf sdfsdfsdf

</div>
              <DateInput
                value={state.datePickerValue}
                onDatePickerChange={handleDatePickerChange}
                onDateInputChange={handleDateInputChange}
              />
            </Item>
          </ItemGroup>
        }
      </State>
    );
  })
  .add('Tooltip', () => {
    const description = <span>Content with component <Icon name='tracker' /></span>;
    const longDescription = 'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the l';
    const trackerStyle = {
      padding: '10px',
      backgroundColor: '#ccc',
      display: 'inline-block',
    };
    const fixedStyle = { ...trackerStyle, position: 'fixed' };
    const centerStyle = { ...trackerStyle, textAlign: 'center' };
    const rightAbsoluteStyle = { ...trackerStyle, position: 'absolute', right: 0 };

    return (
      <ItemGroup
        title='Tooltip'
      >
        <Item>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            <Tooltip
              title='Target position: fixed, left: 20%'
              description={description}
              position='bottom'
            >
              <Icon
                name='tracker'
                style={{ ...fixedStyle, ...centerStyle }}
              />
            </Tooltip>
          </div>
        </Item>
        <Item>
          <br /><br />
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            <Tooltip
              title='Target position: absolute, right: 0'
              description={description}
              // position='bottom'
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
  });