import { storiesOf } from '@storybook/react';
import React from 'react';

import { ToggleButton } from './ToggleButton';

storiesOf('Toggle Button', module)
  .add('simple', () => (
    <ToggleButton
      handleChange={e => e}
      label='Այ էս մեկը'
      name='test 1'
      value='test1'
      id='test1'
    />
  )).add('checked', () => (
    <ToggleButton
      handleChange={e => e}
      label='Համարյա էս մեկը'
      value='test2'
      name='test 2'
      id='test2'
      isChecked
    />
  ))
  .add('disabled', () => (
    <ToggleButton
      handleChange={e => e}
      label='էս մեկը չես կարա'
      value='test3'
      name='tes3'
      isDisabled
      id='test3'
    />
  ))
  .add('checked and disabled', () => (
    <ToggleButton
      handleChange={e => e}
      label='էս մեկն էլ'
      value='test4'
      name='test4'
      isDisabled
      isChecked
      id='test4'
    />
  ));
