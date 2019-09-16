import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextInput } from '../TextInput';
import { ListItem } from '../ListItem';
import { Popover } from '../Popover';
import { List } from '../List';
import { Icon } from '../Icon';
import { Tag } from '../Tag';

import { isMobile } from '../utils';

import styles from './select.css';

export class Select extends React.Component {
  constructor(props) {
    super(props);

    const { children } = this.props;

    this.childOptions = React.Children.map(children, option => ({
      value: option.props.value,
      name: option.props.children,
    }));

    const selected = this.getSelected();

    this.state = {
      isOpen: false,
      search: '',
      selected,
    };
  }

  componentDidUpdate(prevProps) {
    const { children, value } = this.props;

    this.childOptions = React.Children.map(children, option => ({
      value: option.props.value,
      name: option.props.children,
    }));

    if (prevProps.value !== value) {
      this.handleSelectChange(value);
    }
  }

  getSelected() {
    const { multiple, value } = this.props;

    let selected = [];
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

    return selected;
  }

  setInputRef = (ref) => {
    this.input = ref;
  };

  getOptions() {
    const { value: propValue, nothingFoundText } = this.props;
    const { search } = this.state;

    let options = this.childOptions;

    if (search && search.trim() !== '') {
      const lowerCaseSearch = search.toLowerCase();

      options = options.filter(({ name }) => name.toLowerCase().includes(lowerCaseSearch));
    }

    return (
      <List className={styles.list}>
        {options.length > 0 ? options.map(({ name, value }) => (
          <ListItem
            icon={(Array.isArray(propValue) && propValue.includes(value)) || propValue === value ? 'thick' : null}
            onClick={this.handleCustomChange}
            iconClassName={styles.listIcon}
            value={value}
            key={value}
          >
            {name}
          </ListItem>
        )) : (
          <span className={styles.emptyState}>
            {nothingFoundText}
          </span>
        )}
      </List>
    );
  }

  getContent() {
    const { multiple, value, placeholder } = this.props;
    const { selected, search, isOpen } = this.state;

    if (multiple) {
      return (
        <React.Fragment>
          {selected
            .map(option => (
              <Tag
                onClose={(event) => {
                  event.preventDefault();
                  this.handleSelectChange(option.value, isOpen);
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

  isOpenChange = () => {
    const { onClick } = this.props;
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });

    if (onClick) {
      onClick();
    }
  };

  handleNativeChange = ({ currentTarget: { value } }) => {
    this.handleSelectChange(value);
  };

  handleSearchChange = ({ currentTarget: { value } }) => {
    const { search } = this.state;

    if (search !== value) {
      this.setState({ search: value });
    }
  };

  handleCustomChange = ({ value, event }) => {
    event.preventDefault();
    event.stopPropagation();

    this.handleSelectChange(value);
  };

  handleInputKeyPress = () => {
    const { onClick } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      this.setState({ isOpen: true });

      if (onClick) {
        onClick();
      }
    }
  };

  onClick = (isOpen) => {
    const { onClick, multiple } = this.props;

    if (multiple) {
      if (this.input && !isMobile()) {
        this.input.focus();
      }

      if (!isOpen) {
        this.setState({ isOpen });
      }
    } else {
      this.setState({ isOpen });
    }

    if (onClick) {
      onClick();
    }
  };

  handleSelectChange(optionValue, closeOptions = true) {
    const { multiple, value, onChange, name } = this.props;
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

    this.setState({
      selected: nextSelected,
      search: '',
      isOpen: closeOptions && multiple,
    }, () => {
      onChange({
        currentTarget: {
          value: selectedValue,
          name,
        },
        target: {
          value: selectedValue,
          name,
        },
      });
    });
  }

  render() {
    const {
      placeholder,
      multiple,
      value,
      name,
      onClick,
      onChange,
      className,
      children,
      nothingFoundText,
      ...props
    } = this.props;
    const { isOpen } = this.state;

    const isNativeMode = isMobile() && !multiple;

    const nativeSelectClasses = classNames({
      [className]: true,
      [styles.select]: true,
      [styles.nativeSelect]: !isNativeMode,
      [styles.nativeCustomSelect]: isNativeMode,
    });

    const selectClasses = classNames({
      [className]: true,
      [styles.select]: true,
      [styles.active]: isOpen,
    });

    const iconClasses = classNames({
      [styles.icon]: true,
      [styles.reverseIcon]: isOpen,
    });

    const nativeIconClasses = classNames({
      [styles.nativeIcon]: true,
    });

    const contentWrapperClasses = classNames({
      [styles.contentWrapper]: true,
      [styles.contentWrapperSingle]: !multiple,
    });

    return (
      <React.Fragment>
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
          {isNativeMode && (
            <Icon
              className={nativeIconClasses}
              name='arrow-down'
            />
          )}
        </div>
        {!isNativeMode && (
          <Popover
            onTargetEvent={this.onClick}
            content={this.getOptions()}
            watchTargetDimensions
            contentEqualToTarget
            contentRelative
            trigger='click'
            open={isOpen}
            gap={8}
          >
            <div
              className={selectClasses}
            >
              <div className={contentWrapperClasses}>
                {this.getContent()}
              </div>
              <Icon
                onClick={multiple ? this.isOpenChange : undefined}
                className={iconClasses}
                name='arrow-down'
                size={24}
              />
            </div>
          </Popover>
        )}
      </React.Fragment>
    );
  }
}

Select.propTypes = {
  /** String, Number or Array, value of select */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  /** Function, called when select value is changed */
  onChange: PropTypes.func,
  /** Function, called when select is clicked or options are closed, input is focused and key is pressed */
  onClick: PropTypes.func,
  /** String, placeholder of search input or value if value is empty */
  placeholder: PropTypes.string,
  /** Boolean, whether multiple options can be selected */
  multiple: PropTypes.bool,
  /** Elements, content of select tag */
  children: PropTypes.any,
  /** String, name of select */
  name: PropTypes.string,
  /** String, classname that will be added to select */
  className: PropTypes.string,
  /** String, text that will be shown if there is no option */
  nothingFoundText: PropTypes.string,
};

Select.defaultProps = {
  value: '',
  onChange: undefined,
  onClick: undefined,
  placeholder: '',
  multiple: false,
  children: null,
  name: '',
  className: '',
  nothingFoundText: 'Nothing found',
};
