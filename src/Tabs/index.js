import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './tabs.css';

export function Tabs({
  value,
  onChange,
  className,
  children,
  ...props
}) {
  const tabsClassNames = classNames({
    [className]: true,
    [styles.tabs]: true,
  });

  return (
    <div
      className={tabsClassNames}
      {...props}
    >
      <div
        className={styles.header}
      >
        {children.map((tab, index) => {
          const titleClassNames = classNames({
            [styles.title]: true,
            [styles.active]: value === tab.props.uniqueKey,
          });

          return (
            <div
              key={index}
              className={titleClassNames}
              onClick={() => onChange(tab.props.uniqueKey)}
              role='presentation'
            >
              {tab.props.title}
            </div>
          );
        })}
      </div>

      {children.map((tab, index) => {
        const contentClassNames = classNames({
          [styles.content]: true,
          [styles.hide]: value !== tab.props.key,
        });

        return (
          <div
            key={index}
            className={contentClassNames}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  /** String, value of selected tab */
  value: PropTypes.string,
  /** Function, will be called when clicked on tab */
  onChange: PropTypes.func,
  /** String, className that will be added to element */
  className: PropTypes.string,
  /** Object, style that will be added to element */
  style: PropTypes.object,
  /** String or JSX or Element, content of element */
  children: PropTypes.any,
};

Tabs.defaultProps = {
  value: '',
  onChange: undefined,
  className: '',
  style: undefined,
  children: null,
};
