import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabContext } from '../Tabs';

import styles from './tab.css';

export function Tab({
  index,
  title,
  disabled,
  className,
  children,
  ...props
}) {
  const tabClassNames = classNames({
    [className]: true,
    [styles.tab]: true,
  });

  return (
    <TabContext.Consumer>
      {({ value, onChange }) => {
        const titleClassNames = classNames({
          [styles.title]: true,
          [styles.active]: value === index,
          [styles.disabled]: disabled,
        });

        return (
          <div
            className={tabClassNames}
            {...props}
          >
            <div
              className={titleClassNames}
              onClick={disabled ? undefined : (() => onChange(index))}
              role='presentation'
            >
              {title}
            </div>
          </div>
        );
      }}
    </TabContext.Consumer>
  );
}

Tab.propTypes = {
  /** Number, index of tab */
  index: PropTypes.number,
  /** String, title of tab */
  title: PropTypes.string,
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
  index: 0,
  title: '',
  disabled: false,
  className: '',
  style: undefined,
  children: null,
};
