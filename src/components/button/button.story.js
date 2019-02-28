import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './button';
import { Icon } from '../Icon';


storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button <Icon icon='close' /></Button>
  ))
  .add('with some emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));
