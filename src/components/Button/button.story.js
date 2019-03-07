import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from "@sambego/storybook-state";

import { Button } from '.';

storiesOf('Button', module)
  .add('Primary button', () => (
    <Button
      name='Կոճակ'
    />
  )).add('Secondary button', () => (
    <Button
      name='Կոճակ'
      color='secondary'
    />
  )).add('Default button', () => (
    <Button
      name='Կոճակ'
      color='neutral'
    />
  )).add('Warning button', () => (
    <Button
      name='Կոճակ'
      color='warning'
    />
  ))
  .add('With icon', () => (
    <Button
      name='Կոճակ'
      icon='tracker'
    />
  ))
  .add('Disabled button', () => (
    <Button
      name='Կոճակ'
      disabled
    />
  ))
  .add('Secondary disabled button', () => (
    <Button
      name='Կոճակ'
      color='secondary'
      disabled
    />
  ))
  .add('Link button', () => (
    <Button
      name='Կոճակ'
      color='secondary'
      type='link'
      href='https://sflpro.com/'
      target='_blank'
    />
  ))
  .add('Link warning button', () => (
    <Button
      name='Կոճակ'
      color='warning'
      type='link'
    />
  ))
  .add('Link disabled button', () => (
    <Button
      name='Կոճակ'
      type='link'
      disabled
    />
  ))
  .add('Circle button', () => (
    <Button
      icon='tracker'
      type='circle'
    />
  ))
  .add('Secondary circle button', () => (
    <Button
      icon='tracker'
      color='secondary'
      type='circle'
    />
  ))
  .add('Circle disabled button', () => (
    <Button
      icon='tracker'
      type='circle'
      disabled
    />
  ))
;
