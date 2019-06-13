import { configure } from '@storybook/react';

function loadStories() {
  require('../src/helpers/ColorScheme/colorScheme.story');
  require('../src/Icon/icon.story');
  require('../src/Button/button.story');
  require('../src/TextInput/textInput.story');
  require('../src/CardInput/cardInput.story');
  require('../src/FileInput/fileInput.story');
  require('../src/Textarea/textarea.story');
  require('../src/Autocomplete/autocomplete.story');
  require('../src/DropDown/dropDown.story');
  require('../src/Select/select.story');
  require('../src/Checkbox/checkbox.story');
  require('../src/RadioButton/radioButton.story');
  require('../src/ToggleButton/toggleButton.story');
  require('../src/Slider/slider.story');
  require('../src/InputSlider/inputSlider.story');
  require('../src/ControlsGroup/controlsGroup.story');
  require('../src/Tooltip/tooltip.story');
  require('../src/Dialog/dialog.story');
  require('../src/Tag/tag.story');
  require('../src/Notification/notification.story');
  require('../src/NotificationStack/notificationStack.story');
  require('../src/Table/table.story');
  require('../src/Form/form.story');
  require('../src/Area/area.story');
  require('../src/Tabs/tabs.story');
  require('../src/helpers/Grid/grid.story');
  require('../src/helpers/Typography/typography.story');
  require('../src/fonts.css');
}

configure(loadStories, module);
