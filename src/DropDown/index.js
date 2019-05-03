import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ListItem } from '../ListItem';
import { List } from '../List';
import { Icon } from '../Icon';

import styles from './dropDown.css';

export class DropDown extends React.Component {
  constructor(props) {
    super(props);

    const { children, value } = this.props;

    this.childOptions = React.Children.map(children, option => ({
      value: option.props.value,
      name: option.props.name,
    }));

    const selected = this.childOptions.find(option => option.value === value);

    this.state = {
      selected,
    };
  }

  getOptions() {
    const {
      value: propValue,
    } = this.props;
    const options = this.childOptions;

    return (
      <List className={styles.list}>
        {options.length > 0 && options.map(({ name, value }) => (
          <ListItem
            icon={propValue.includes(value) ? 'thick' : null}
            onClick={this.handleCustomChange}
            iconClassName={styles.listIcon}
            value={value}
            label={name}
            key={value}
          />
        ))}
      </List>
    );
  }

  handleCustomChange = ({ value, event }) => {
    event.preventDefault();
    event.stopPropagation();
    this.handleSelectChange(value, false);
  };

  onClick = (event) => {
    const { onClick } = this.props;
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };

  handleSelectChange(optionValue, closeOptions = true) {
    const { onChange } = this.props;
    const selected = this.childOptions.find(option => option.value === optionValue);

    this.setState(
      { selected },
      () => {
        onChange(optionValue, closeOptions);
      },
    );
  }

  render() {
    const {
      open,
      value,
      name,
      children,
      button: Button,
      elemProps,
      ...props
    } = this.props;
    const { selected } = this.state;
    console.log(selected);

    const options = this.getOptions();

    const selectClasses = classNames({
      [styles.dropDown]: true,
      [styles.active]: open,
    });

    const iconClasses = classNames({
      [styles.icon]: true,
      [styles.reverseIcon]: open,
    });

    return (
      <React.Fragment>
        <div className={styles.dropDownWrapper}>
          <Button
            className={selectClasses}
            role='presentation'
            onClick={this.onClick}
            {...props}
          >
            <span className={styles.selectName}>
              {selected.name}
            </span>
            <span className={styles.iconWrapper}>
              <Icon
                className={iconClasses}
                name='arrow-down'
                size={24}
              />
            </span>
          </Button>
          {open && options}
          {open && (<div className={styles.overlay} />)}
        </div>
      </React.Fragment>
    );
  }
}

DropDown.propTypes = {
  /** String, value item */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Function, called when select value is changed */
  onChange: PropTypes.func,
  /** Function, called when select is clicked or options are closed, input is focused and key is pressed */
  onClick: PropTypes.func,
  /** Boolean, whether options are shown */
  open: PropTypes.bool,
  /** Elements, content of select tag */
  children: PropTypes.any,
  /** String, name of select */
  name: PropTypes.string,
  /** Element for showing select */
  button: PropTypes.any.isRequired,
  /** Element properties */
  elemProps: PropTypes.object,
};

DropDown.defaultProps = {
  value: '',
  onChange: undefined,
  onClick: undefined,
  open: false,
  children: null,
  name: '',
  elemProps: undefined,
};
