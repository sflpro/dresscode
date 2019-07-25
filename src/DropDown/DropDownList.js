import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { List } from '../List';

import styles from './dropDown.css';

export function DropDownList({ children }) {
  const listClasses = classNames({
    [styles.dropDownList]: true,
  });

  const childOptions = React.Children.map(children, (option) => {
    const { type: Component, props: optionProps } = option;
    return (
      <Component {...optionProps}>
        {optionProps.children}
      </Component>
    );
  });

  return (
    <List className={listClasses}>
      {childOptions.map((child, index) => (
        <div
          className={styles.dropDownListItem}
          key={index}
        >
          {child}
        </div>
      ))}
    </List>
  ) || null;
}

DropDownList.propTypes = {
  /** Elements, content of dropdown list */
  children: PropTypes.any,
};

DropDownList.defaultProps = {
  children: null,
};
