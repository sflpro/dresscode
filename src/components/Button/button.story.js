import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '.';

import { ItemGroup } from '../ItemGroup';
import { ItemRow } from '../ItemRow';
import { Item } from '../Item';

storiesOf('Button', module)
  .add('Primary button', () => {
    return (
      <ItemGroup
        title='Text Input'
      >
        <ItemRow>
          <Item>
            <Button
              name='Կոճակ'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              color='secondary'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              color='neutral'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              color='warning'
            />
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button
              name='Կոճակ'
              disabled
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              color='secondary'
              disabled
            />
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button
              name='Կոճակ'
              color='secondary'
              type='link'
              href='https://sflpro.com/'
              target='_blank'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              color='warning'
              type='link'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              type='link'
              disabled
            />
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button
              name='Կոճակ'
              icon='tracker'
            />
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button
              icon='tracker'
              type='circle'
            />
          </Item>
          <Item>
            <Button
              icon='tracker'
              color='secondary'
              type='circle'
            />
          </Item>
          <Item>
            <Button
              icon='tracker'
              type='circle'
              disabled
            />
          </Item>
          <Item>
            <Button
              icon='tracker'
              color='warning'
              type='circle'
            />
          </Item>
        </ItemRow>
      </ItemGroup>
    );
  });
