import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

export const InfoStoryConfig = {
  decorators: [withSmartKnobs, withKnobs, withInfo],
  info: {
    inline: true,
    header: false,
  },
  knobs: {
    timestamps: true,
    escapeHTML: false,
  },
};
