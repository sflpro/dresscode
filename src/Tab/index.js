import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TabContext } from '../Tabs';

import styles from './tab.css';

export function Tab({
  disabled,
  className,
  children,
  matchPartially,
  ...props
}) {
  return (
    <TabContext.Consumer>
      {({ value, identifier, onChange }) => {
        const isActive = (matchPartially && typeof value === 'string') ? value.indexOf(props[identifier]) === 0
          : value === props[identifier];
        const tabClassNames = classNames({
          [className]: true,
          [styles.tab]: true,
          [styles.active]: isActive,
          [styles.disabled]: disabled,
        });

        const onClick = (disabled || typeof onChange !== 'function')
          ? undefined
          : () => onChange(props[identifier]);

        return (
          <div
            className={tabClassNames}
            onClick={onClick}
            role='presentation'
            {...props}
          >
            {children}
          </div>
        );
      }}
    </TabContext.Consumer>
  );
}

Tab.propTypes = {
  /** Boolean, whether tab is disabled */
  disabled: PropTypes.bool,
  /** Boolean, whether value partially match  */
  matchPartially: PropTypes.bool,
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, style that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Tab.defaultProps = {
  disabled: false,
  matchPartially: false,
  className: '',
  style: undefined,
  children: null,
};
