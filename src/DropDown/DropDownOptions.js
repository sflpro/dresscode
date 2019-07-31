import PropTypes from 'prop-types';
import React from 'react';

import { List } from '../List';

import styles from './dropDown.css';

export function DropDownOptions({ children, ...props }) {
  const childOptions = React.Children.map(
    children,
    ({ type: Component, props: optionProps }) => (
      <Component {...optionProps}>
        {optionProps.children}
      </Component>
    ),
  );

  return (
    <List {...props}>
      {childOptions.map((child, index) => (
        <div
          className={styles.dropDownListItem}
          key={index}
        >
          {child}
        </div>
      ))}
    </List>
  );
}

DropDownOptions.propTypes = {
  /** Elements, content of dropdown options */
  children: PropTypes.any.isRequired,
};
