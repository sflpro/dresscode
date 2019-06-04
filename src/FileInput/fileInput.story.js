import React from 'react';
import { storiesOf } from '@storybook/react';

import { ImportInstruction } from '../helpers/ImportInstruction';
import { InfoStoryConfig } from '../configs';
import { FileInput } from './index';
import { Icon } from '../Icon';

storiesOf('Form controls/Input', module)
  .add('File Input', () => (
    <FileInput>
      <Icon
        style={{ marginRight: '16px' }}
        name='download'
      />
      Փոփոխել
    </FileInput>
  ), {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='FileInput' />,
    },
  });
