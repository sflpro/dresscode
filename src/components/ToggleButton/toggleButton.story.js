import React from 'react';
import { storiesOf } from '@storybook/react';

import { ToggleButton } from '.';

import { ControlsGroup } from '../ControlsGroup';
import {Label} from "../Label";

storiesOf('Form controls', module)
  .add('Toggle Button', () => (
    <ControlsGroup style={{ width: '324px' }}>
      <Label
        display='col'
      >
        Այ էս մեկը
        <ToggleButton
          onChange={e => e}
          name='test 1'
          value='test1'
        />
      </Label>
      <Label
        display='col'
      >
        Համարյա էս մեկը
        <ToggleButton
          onChange={e => e}
          value='test2'
          name='test 2'
          checked
        />
      </Label>
      <Label
        display='col'
        disabled
      >
        էս մեկը չես կարա
        <ToggleButton
          onChange={e => e}
          value='test3'
          name='tes3'
          disabled
        />
      </Label>
      <Label
        display='col'
        disabled
      >
        էս մեկն էլ
        <ToggleButton
          onChange={e => e}
          value='test4'
          name='test4'
          disabled
          checked
        />
      </Label>
    </ControlsGroup>
  ));
