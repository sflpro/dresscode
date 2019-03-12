import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Icon/icon.story.js');
  require('../src/components/Tag/tag.story.js');
  require('../src/components/TextInput/textInput.story.js');
  require('../src/components/Textarea/textarea.story.js');
  require('../src/components/Select/select.story.js');
  require('../src/components/Checkbox/checkbox.story.js');
  require('../src/components/ControlsGroup/controlsGroup.story');
}

configure(loadStories, module);
