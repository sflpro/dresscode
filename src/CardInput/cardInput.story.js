import React from 'react';
import { storiesOf } from '@storybook/react';

import { CardInput } from '.';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Input', module)
  .add('Card Input', () => (
    <CardInput />
  ), InfoStoryConfig);
