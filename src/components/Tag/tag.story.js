import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tag } from './Tag';

storiesOf('Tag', module)
  .add('Primary tag', () => (
    <Tag
      name='Primary tag'
    />
  )).add('Secondary tag', () => (
    <Tag
      name='Secondary tag'
      type='secondary'
    />
  )).add('Clickable tag', () => (
    <Tag
      name='Clickable tag'
      clickable
    />
  ));
