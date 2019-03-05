import React from 'react';
import { storiesOf } from '@storybook/react';

import { TextInput } from '.';

storiesOf('TextInput', module)
  .add('With default value', () => (
    <TextInput
      value='Default text'
    />
  )).add('With placeholder', () => (
    <TextInput
      placeholder='Placeholder text'
    />
  ))
  .add('Disabled', () => (
    <TextInput
      value='Default text'
      disabled
    />
  )).add('With label', () => (
    <TextInput
      label='Text label'
    />
  )).add('Password', () => (
    <TextInput
      value='Default text'
      type='password'
    />
  )).add('With prefix', () => (
    <TextInput
      prefix='+374'
    />
  )).add('Validated', () => (
    <TextInput
      value='Default text'
      icon='check'
      isValid
    />
  )).add('Validation failed', () => (
    <TextInput
      value='Default text'
      icon='warning'
      error='Error text'
      hasError
    />
  ));
