import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/button/button.story.js');
}

configure(loadStories, module);
