import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';
import ComponentGuide from '../ComponentGuide/ComponentGuide';


storiesOf('Input', module)
  .add('With default value', () => (
    <ComponentGuide>
      <Input defaultValue='Default text' />
    </ComponentGuide>
  )).add('Disabled', () => (
    <Input disabled defaultValue='Default text' />
  )).add('With label', () => (
    <Input label='Text label' />
  ))  .add('Password', () => (
    <Input defaultValue='Default text' type='password' />
  )).add('With prefix', () => (
    <Input prefix='+374' />
  )).add('Validated', () => (
    <Input defaultValue='Default text' isValid />
  )).add('Validation failed', () => (
    <Input defaultValue='Default text' hasError error='Error text' />
  ));
