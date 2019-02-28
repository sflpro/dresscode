import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/button/button.story.js');
  require('../src/components/Checkbox/Checkbox.story.js');
  require('../src/components/checkboxGroup/CheckboxGroup.story.js');
}

configure(loadStories, module);
