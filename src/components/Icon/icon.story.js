import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from './Icon';

storiesOf('Icons', module)
  .add('List', () => <Icon name='tracker' />);
