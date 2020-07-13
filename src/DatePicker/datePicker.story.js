import React from 'react';
import { storiesOf } from '@storybook/react';
import { date, select } from '@storybook/addon-knobs';

import { DatePicker } from '.';

import { ImportInstruction } from '../helpers/ImportInstruction';

import { InfoStoryConfig } from '../configs';


const optionsView = [
  'day',
  'month',
  'year',
];

storiesOf('DatePicker', module)
  .add('DatePicker', () => {
    const view = select('view', optionsView, 'day');

    return (
      <DatePicker
        key={view}
        value={new Date(date('value'))}
        view={view}
      />
    );
  }, {
    ...InfoStoryConfig,
    info: {
      ...InfoStoryConfig.info,
      text: <ImportInstruction componentName='DatePicker' />,
    },
  });
