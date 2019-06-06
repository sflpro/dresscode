import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TabContext } from '../Tabs';

import styles from './tab.css';

export function Tab({
  disabled,
  className,
  children,
  ...props
}) {
  return (
    <TabContext.Consumer>
      {({ value, identifier, onChange }) => {
        const tabClassNames = classNames({
          [className]: true,
          [styles.tab]: true,
          [styles.active]: value === props[identifier],
          [styles.disabled]: disabled,
        });

        return (
          <div
            className={tabClassNames}
            onClick={disabled ? undefined : (() => onChange(props[identifier]))}
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
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, style that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Tab.defaultProps = {
  disabled: false,
  className: '',
  style: undefined,
  children: null,
};
