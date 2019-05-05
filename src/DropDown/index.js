import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ListItem } from '../ListItem';
import { List } from '../List';
import { Icon } from '../Icon';

import styles from './dropDown.css';

export class DropDown extends React.Component {
  childOptions = [];

  componentDidMount() {
    const { children } = this.props;
    this.childOptions = React.Children.map(children, (option) => {
      const { type: Component, props: optionProps } = option;
      return {
        value: optionProps.value,
        label: (<Component {...optionProps}>{optionProps.children}</Component>),
      };
    });
  }

  getOptions() {
    const options = this.childOptions;

    return (
      <List className={styles.list}>
        {options.length > 0 && options.map(({ label, value }, index) => (
          <ListItem
            className={styles.listItem}
            iconClassName={styles.listIcon}
            onClick={this.onClick}
            value={value}
            label={label}
            key={value || index}
          />
        ))}
      </List>
    );
  }

  onClick = ({ event }) => {
    const { onClick } = this.props;
    event.preventDefault();
    event.stopPropagation();
    onClick(event);
  };

  render() {
    const {
      open,
      children,
      button: Button,
      label,
      ...props
    } = this.props;

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
              {label}
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
          {open && (
            <div
              role='presentation'
              onClick={event => this.onClick({ event })}
              className={styles.overlay}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

DropDown.propTypes = {
  /** Function, called when dropdown is clicked or items are closed */
  onClick: PropTypes.func,
  /** Boolean, whether options are shown */
  open: PropTypes.bool,
  /** Elements, content of dropdown tag */
  children: PropTypes.any,
  /** Element for showing dropdown button */
  button: PropTypes.any.isRequired,
  /** String, label for dropdown button */
  label: PropTypes.string,
};

DropDown.defaultProps = {
  onClick: undefined,
  open: false,
  children: null,
  label: undefined,
};
