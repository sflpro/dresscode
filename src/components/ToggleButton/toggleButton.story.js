import React from 'react';
import { storiesOf } from '@storybook/react';

import { ControlsGroup } from '../ControlsGroup';
import { ToggleButton } from './index';

storiesOf('Toggle Button', module)
  .add('Toggle Button', () => (
    <ControlsGroup style={{width: '324px'}}>
      <ToggleButton
        onChange={e => e}
        label='Այ էս մեկը'
        name='test 1'
        value='test1'
        id='test1'
      />
      <ToggleButton
        onChange={e => e}
        label='Համարյա էս մեկը'
        value='test2'
        name='test 2'
        id='test2'
        checked
      />
      <ToggleButton
        onChange={e => e}
        label='էս մեկը չես կարա'
        value='test3'
        name='tes3'
        id='test3'
        disabled
      />
      <ToggleButton
        onChange={e => e}
        label='էս մեկն էլ'
        value='test4'
        name='test4'
        id='test4'
        disabled
        checked
      />
    </ControlsGroup>
  ));
