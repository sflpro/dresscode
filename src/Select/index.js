import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextInput } from '../TextInput';
import { ListItem } from '../ListItem';
import { List } from '../List';
import { Icon } from '../Icon';
import { Tag } from '../Tag';

import { isMobile } from '../utils';

import styles from './select.css';

export class Select extends React.Component {
  constructor(props) {
    super(props);

    const { multiple, value, children } = this.props;
    let selected = [];

    this.childOptions = React.Children.map(children, option => ({
      value: option.props.value,
      name: option.props.name,
    }));

    if (multiple) {
      this.childOptions.forEach((option) => {
        if (value.includes(option.value)) {
          selected.push({ name: option.name, value: option.value });
        }
      });

      selected.sort((s1, s2) => value.indexOf(s1.value) - value.indexOf(s2.value));
    } else {
      selected = this.childOptions.find(option => option.value === value);
    }

    this.state = { selected, search: '' };
  }

  componentDidUpdate() {
    const { children } = this.props;

    this.childOptions = React.Children.map(children, option => ({
      value: option.props.value,
      name: option.props.name,
    }));
  }

  setInputRef = (ref) => {
    this.input = ref;
  };

  getOptions() {
    const {
      value: propValue,
      button,
      multiple,
    } = this.props;
    const { search } = this.state;

    let options = this.childOptions;

    if (search && search.trim() !== '') {
      const lowerCaseSearch = search.toLowerCase();

      options = options.filter(({ name }) => name.toLowerCase().includes(lowerCaseSearch));
    }

    const listClasses = classNames({
      [styles.list]: true,
      [styles.selectListFullWidth]: button && !multiple,
    });

    return (
      <List className={listClasses}>
        {options.length > 0 ? options.map(({ name, value }) => (
          <ListItem
            icon={propValue.includes(value) ? 'thick' : null}
            onClick={this.handleCustomChange}
            iconClassName={styles.listIcon}
            value={value}
            label={name}
            key={value}
          />
        )) : (
          <span className={styles.emptyState}>
            Ոչինչ չի գտնվել
          </span>
        )}
      </List>
    );
  }

  getContent() {
    const { multiple, value, placeholder, open } = this.props;
    const { selected, search } = this.state;

    if (multiple) {
      return (
        <React.Fragment>
          {selected
            .map(option => (
              <Tag
                onClose={(event) => {
                  event.preventDefault();
                  this.handleSelectChange(option.value, open);
                }}
                onClick={event => event.preventDefault()}
                className={styles.tag}
                name={option.name}
                key={option.value}
                clickable
              />
            ))}
          <TextInput
            onKeyPress={this.handleInputKeyPress}
            onChange={this.handleSearchChange}
            forwardedRef={this.setInputRef}
            placeholder={placeholder}
            className={styles.input}
            value={search}
          />
        </React.Fragment>
      );
    }

    return selected ? selected.name : (value || placeholder);
  }

  hideOptions = (event) => {
    const { open, onClick } = this.props;
    event.stopPropagation();
    event.preventDefault();

    if (open) {
      onClick();
    }
  };

  handleNativeChange = ({ currentTarget: { value } }) => {
    this.handleSelectChange(value);
  };

  handleSearchChange = ({ currentTarget: { value } }) => {
    const { search } = this.state;

    if (search !== value) {
      this.setState({
        search: value,
      });
    }
  };

  handleCustomChange = ({ value, event }) => {
    event.preventDefault();
    event.stopPropagation();
    this.handleSelectChange(value);
  };

  handleInputKeyPress = () => {
    const { open, onClick } = this.props;

    if (!open) {
      onClick();
    }
  };

  onClick = (event) => {
    const { multiple, onClick } = this.props;

    event.preventDefault();
    event.stopPropagation();

    if (multiple) {
      this.input.focus();
    } else {
      onClick();
    }
  };

  selectingElement = () => {
    const { button, multiple } = this.props;
    return button && !multiple ? button : 'div';
  };

  handleSelectChange(optionValue, closeOptions = true) {
    const { multiple, value, onChange } = this.props;
    const { selected } = this.state;

    let selectedValue = optionValue;
    let nextSelected;

    if (multiple) {
      let selectedOptionLabel = '';

      this.childOptions.forEach((option) => {
        if (option.value === optionValue) {
          selectedOptionLabel = option.name;
        }
      });

      let indexOfOptionLabel;
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].value === optionValue) {
          indexOfOptionLabel = i;
          break;
        }
      }

      const indexOfOptionValue = value.indexOf(optionValue);

      nextSelected = [...selected];
      const nextValue = [...value];

      if (indexOfOptionValue !== -1) {
        nextSelected.splice(indexOfOptionLabel, 1);
        nextValue.splice(indexOfOptionValue, 1);
      } else {
        nextSelected.push({ name: selectedOptionLabel, value: optionValue });
        nextValue.push(optionValue);
      }

      selectedValue = nextValue;
    } else {
      nextSelected = this.childOptions.find(option => option.value === optionValue);
    }

    this.setState({ selected: nextSelected, search: '' }, () => {
      onChange(selectedValue, closeOptions && multiple);
    });
  }

  render() {
    const {
      placeholder,
      multiple,
      open,
      value,
      name,
      onClick,
      onChange,
      className,
      children,
      button,
      buttonProps,
      ...props
    } = this.props;

    const isNativeMode = isMobile() && !multiple;

    const nativeSelectClasses = classNames({
      [className]: true,
      [styles.select]: true,
      [styles.nativeSelect]: !isNativeMode || button,
      [styles.nativeCustomSelect]: isNativeMode,
    });
    const selectClasses = classNames({
      [className]: true,
      [styles.select]: !button || multiple,
      [styles.selectElem]: !!button && !multiple,
      [styles.active]: open,
    });
    const iconClasses = classNames({
      [styles.icon]: true,
      [styles.reverseIcon]: open,
    });
    const nativeIconClasses = classNames({
      [styles.icon]: true,
      [styles.nativeIcon]: true,
    });
    const labelClasses = classNames({
      [styles.label]: true,
      [styles.labelOpen]: open,
    });

    const contentWrapperClasses = classNames({
      [styles.contentWrapper]: true,
      [styles.contentWrapperSingle]: !multiple,
    });

    const SelectingElement = this.selectingElement();

    return (
      <div className={styles.wrapper}>
        <div
          className={labelClasses}
          role='presentation'
          onClick={this.onClick}
        >
          <div className={styles.nativeSelectWrapper}>
            <select
              onChange={this.handleNativeChange}
              className={nativeSelectClasses}
              multiple={multiple}
              value={value}
              name={name}
              {...props}
            >
              {children}
            </select>
            {isNativeMode && !button && (
              <Icon
                className={nativeIconClasses}
                name='arrow-down'
              />
            )}
          </div>
          {(!isNativeMode || button) && (
            <React.Fragment>
              <SelectingElement
                onClick={!multiple ? this.onClick : undefined}
                className={selectClasses}
                role='presentation'
                {...buttonProps}
                {...props}
              >
                <div className={contentWrapperClasses}>
                  {this.getContent()}
                </div>
                <Icon
                  onClick={multiple ? onClick : undefined}
                  className={iconClasses}
                  name='arrow-down'
                  size={24}
                />
              </SelectingElement>
              <div>
                {open && this.getOptions()}
              </div>
            </React.Fragment>
          )}
        </div>
        {open && (
          <div
            className={styles.overlay}
            onClick={this.hideOptions}
            role='presentation'
          />
        )}
      </div>
    );
  }
}

Select.propTypes = {
  /** String or array, value of select */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Function, called when select value is changed */
  onChange: PropTypes.func,
  /** Function, called when select is clicked or options are closed, input is focused and key is pressed */
  onClick: PropTypes.func,
  /** String, placeholder of search input or value if value is empty */
  placeholder: PropTypes.string,
  /** Boolean, whether multiple options can be selected */
  multiple: PropTypes.bool,
  /** Boolean, whether options are shown */
  open: PropTypes.bool,
  /** Elements, content of select tag */
  children: PropTypes.any,
  /** String, name of select */
  name: PropTypes.string,
  /** String, classname that will be added to select */
  className: PropTypes.string,
  /** Element for showing select */
  button: PropTypes.any,
  /** Element properties */
  buttonProps: PropTypes.object,
};

Select.defaultProps = {
  value: '',
  onChange: undefined,
  onClick: undefined,
  placeholder: '',
  multiple: false,
  open: false,
  children: null,
  name: '',
  button: undefined,
  buttonProps: undefined,
  className: '',
};
