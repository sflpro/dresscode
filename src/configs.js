import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { withKnobs } from '@storybook/addon-knobs';

export const InfoStoryConfig = {
  decorators: [withSmartKnobs, withKnobs],
  info: {
    inline: true,
    header: false,
  },
  knobs: {
    timestamps: true,
    escapeHTML: false,
  },
};
