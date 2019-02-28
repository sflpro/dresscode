import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from './Icon';

storiesOf('Icons', module)
  .add('List', () => (
    <React.Fragment>
      <Icon icon='thick' />
      <Icon icon='close' />
    </React.Fragment>
  ));
