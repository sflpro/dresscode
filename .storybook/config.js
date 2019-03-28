import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/ColorScheme/colorScheme.story.js');
  require('../src/components/Icon/icon.story');
  require('../src/components/Anchor/anchor.story');
  require('../src/components/Tag/tag.story');
  require('../src/components/TextInput/textInput.story');
  require('../src/components/Textarea/textarea.story');
  require('../src/components/Select/select.story');
  require('../src/components/Checkbox/checkbox.story');
  require('../src/components/RadioButton/radioButton.story');
  require('../src/components/ToggleButton/toggleButton.story');
  require('../src/components/ControlsGroup/controlsGroup.story');
  require('../src/components/Dialog/dialog.story');
  require('../src/components/Tooltip/tooltip.story.js');
  require('../src/components/Button/button.story');
  require('../src/components/DatePicker/datePicker.story.js');
  require('../src/components/Slider/slider.story');
}

configure(loadStories, module);
