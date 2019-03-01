import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Checkbox/checkbox.story.js');
  require('../src/components/ControlsGroup/controlsGroup.story.js');
}

configure(loadStories, module);
