import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/button/button.story.js');
  require('../src/components/Icon/icon.story.js');
}

configure(loadStories, module);
