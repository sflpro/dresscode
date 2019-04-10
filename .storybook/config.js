import { configure } from '@storybook/react';

function loadStories() {
  require('../src/helpers/ColorScheme/colorScheme.story.js');
  require('../src/Icon/icon.story');
  require('../src/Button/button.story');
  require('../src/TextInput/textInput.story');
  require('../src/CardInput/cardInput.story');
  require('../src/Textarea/textarea.story');
  require('../src/Select/select.story');
  require('../src/Checkbox/checkbox.story');
  require('../src/RadioButton/radioButton.story');
  require('../src/ToggleButton/toggleButton.story');
  require('../src/Slider/slider.story');
  require('../src/InputSlider/inputSlider.story');
  require('../src/ControlsGroup/controlsGroup.story');
  require('../src/Tooltip/tooltip.story.js');
  require('../src/Dialog/dialog.story');
  require('../src/Tag/tag.story');
  require('../src/components/Notification/notification.story');
  require('../src/components/NotificationFrame/notificationFrame.story');
}

configure(loadStories, module);
