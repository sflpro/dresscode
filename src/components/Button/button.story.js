import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '.';

import { Anchor } from '../Anchor';
import { ItemGroup } from '../../helpers/ItemGroup';
import { ItemRow } from '../../helpers/ItemRow';
import { Item } from '../../helpers/Item';

storiesOf('Button', module)
  .add('Primary button', () => {
    let a = <a />
    return (
      <ItemGroup
        title='Button'
      >
        <ItemRow>
          <Item>
            <Button
              name='Կոճակ'
              type='submit'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              variant='secondary'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              variant='neutral'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              variant='warning'
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
              variant='secondary'
              disabled
            />
          </Item>
        </ItemRow>
        <ItemRow>
          <Item>
            <Button
              name='Կոճակ'
              variant='secondary'
              as='a'
              type='link'
              target='_blank'
              href='https://sflpro.com/'
            />
          </Item>
          <Item>
            <Button
              name='Կոճակ'
              variant='warning'
              type='link'
              as={Anchor}
              target='_blank'
              href='https://sflpro.com/'
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
              variant='secondary'
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
              variant='warning'
              type='circle'
            />
          </Item>
        </ItemRow>
      </ItemGroup>
    );
  });
