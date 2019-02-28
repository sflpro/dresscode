import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/button/button.story.js');
  require('../src/components/Checkbox/Checkbox.story.js');
  require('../src/components/ControlsGroup/ControlsGroup.story.js');
}

configure(loadStories, module);
