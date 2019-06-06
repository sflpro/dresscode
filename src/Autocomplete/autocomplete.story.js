import React from 'react';
import { storiesOf } from '@storybook/react';

import { Autocomplete } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';
import { InfoStoryConfig } from '../configs';

storiesOf('Form controls/Input', module)
  .add('Autocomplete', () => (
    <Autocomplete
      options={['test 1', 'test 2', 'test 3']}
      onChange={ev => console.dir(ev)}
      value='test'
    />
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Autocomplete' />,
    },
  });
