import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextInput } from '../TextInput';
import { isMobile } from '../../utils';
import { ListItem } from '../ListItem';
import { Label } from '../Label';
import { List } from '../List';
import { Icon } from '../Icon';
import { Tag } from '../Tag';

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
    const { value: propValue } = this.props;
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
            icon={propValue.includes(value) ? 'thick' : null}
            onClick={this.handleCustomChange}
            iconClassName={styles.listIcon}
            value={value}
            label={name}
            key={value}
          />
        )) : (
          <span className={styles.emptyState}>Ոչինչ չի գտնվել</span>
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
            setRef={this.setInputRef}
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
      label,
      name,
      onClick,
      onChange,
      children,
      ...props
    } = this.props;

    const isNativeMode = isMobile() && !multiple;

    const nativeSelectClasses = classNames({
      [styles.select]: true,
      [styles.nativeSelect]: !isNativeMode,
      [styles.nativeCustomSelect]: isNativeMode,
    });
    const selectClasses = classNames({
      [styles.select]: true,
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

    return (
      <div className={styles.wrapper}>
        <Label text={label} className={labelClasses} onClick={this.onClick}>
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
            <React.Fragment>
              <div
                onClick={!multiple ? this.onClick : undefined}
                className={selectClasses}
                role='presentation'
                {...props}
              >
                <div className={styles.contentWrapper}>
                  {this.getContent()}
                </div>
                <Icon
                  onClick={multiple ? onClick : undefined}
                  className={iconClasses}
                  name='arrow-down'
                  size={24}
                />
              </div>
              <div>
                {open && this.getOptions()}
              </div>
            </React.Fragment>
          )}
        </Label>
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  name: PropTypes.string,
  open: PropTypes.bool,
};

Select.defaultProps = {
  onChange: () => {
  },
  onClick: () => {
  },
  placeholder: '',
  multiple: false,
  open: false,
  value: '',
  label: '',
  name: '',
};
