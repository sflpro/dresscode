import React from 'react';
import { storiesOf } from '@storybook/react';

import { ImportInstruction } from '../helpers/ImportInstruction';
import { InfoStoryConfig } from '../configs';
import { Autocomplete } from './index';

storiesOf('Form controls/Input', module)
  .add('Autocomplete', () => (
    <Autocomplete
      onChange={ev => console.dir(ev)}
      value='test'
      options={[
        {
          name: 'test 1',
          value: 'test 1',
        },
        {
          name: 'test 2',
          value: 'test 2',
        },
        {
          name: 'test 3',
          value: 'test 3',
        },
      ]}
    />
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='Autocomplete' />,
    },
  });
