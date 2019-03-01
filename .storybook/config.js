import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Icon/icon.story.js');
  require('../src/components/Checkbox/checkbox.story.js');
  require('../src/components/ControlsGroup/controlsGroup.story');
  require('../src/components/Tag/tag.story.js');
  require('../src/components/TextInput/textInput.story.js');
  require('../src/components/Dropdown/dropdown.story.js');
}

configure(loadStories, module);
