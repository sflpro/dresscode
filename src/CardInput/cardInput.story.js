import React from 'react';
import { storiesOf } from '@storybook/react';

import { CardInput } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Input', module)
  .add('Card Input', () => (
    <CardInput />
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction text='CardInput' />,
    },
  });
