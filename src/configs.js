import { withInfo } from '@storybook/addon-info';

export const InfoStoryConfig = {
  decorators: [withInfo],
  info: {
    inline: true,
    header: false,
  },
};
