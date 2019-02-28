import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/button/button.story.js');
  require('../src/components/Icon/icon.story.js');
  require('../src/components/Checkbox/Checkbox.story.js');
  require('../src/components/ControlsGroup/ControlsGroup.');
}

configure(loadStories, module);
