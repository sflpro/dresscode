import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Toggle } from './Toggle';
import { DropDownList } from './DropDownList';

import styles from './dropDown.css';

export class DropDown extends React.Component {
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
      ...props
    } = this.props;

    const selectClasses = classNames({
      [styles.dropDown]: true,
      [styles.active]: open,
    });

    const childElements = React.Children.map(children, (option) => {
      const { type: Component, props: optionProps } = option;
      if (Component === DropDownList) {
        return (open && (
          <Component {...optionProps}>
            {optionProps.children}
          </Component>
        )) || null;
      }

      return (
        <Component {...optionProps}>
          {optionProps.children}
        </Component>
      );
    });

    return (
      <div
        role='presentation'
        className={selectClasses}
        onClick={event => this.onClick({ event })}
        {...props}
      >
        {childElements.map(item => item)}
        {open && <div className={styles.overlay} />}
      </div>
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
};

DropDown.defaultProps = {
  onClick: undefined,
  open: false,
  children: null,
};

DropDown.Toggle = Toggle;
DropDown.List = DropDownList;
