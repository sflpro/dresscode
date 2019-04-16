import React from 'react';
import { storiesOf } from '@storybook/react';

import { RadioButton } from './index';

import { ControlsGroup } from '../ControlsGroup';
import { Label } from '../Label';

storiesOf('Form controls', module)
  .add('Radio Button', () => (
    <ControlsGroup>
      <Label
        display='col'
      >
        <RadioButton
          onChange={e => e}
          name='test 1'
          value='test1'
        />
        Այ էս մեկը
      </Label>
      <Label
        display='col'
      >
        <RadioButton
          onChange={e => e}
          value='test2'
          name='test 2'
          checked
        />
        Համարյա էս մեկը
      </Label>
      <Label
        display='col'
        disabled
      >
        <RadioButton
          onChange={e => e}
          value='test3'
          name='tes3'
          disabled
        />
        էս մեկը չես կարա
      </Label>
      <Label
        display='col'
        disabled
      >
        <RadioButton
          onChange={e => e}
          value='test4'
          name='test4'
          disabled
          checked
        />
        էս մեկն էլ
      </Label>
    </ControlsGroup>
  ));
