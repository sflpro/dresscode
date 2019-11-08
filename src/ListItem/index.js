import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './listItem.css';

export class ListItem extends React.Component {
  handleOnClick = (event) => {
    const {
      onClick,
      disabled,
      value,
    } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }
    if (typeof onClick === 'function') {
      onClick({ value, event });
    }
  };

  render() {
    const {
      value,
      children,
      icon,
      iconPos,
      iconStyle,
      disabled,
      active,
      iconClassName,
      onClick,
      className,
      contentClassName,
      ...props
    } = this.props;

    const listItemClasses = classNames({
      [className]: true,
      [styles.listItem]: true,
      [styles.active]: active,
      [styles.clickable]: onClick,
      [styles.leftSpace]: !icon && iconPos === 'left',
      [styles.rightSpace]: !icon && iconPos === 'right',
    });
    const listItemIconClasses = classNames({
      [iconClassName]: true,
    });


    return (
      <div
        onClick={this.handleOnClick}
        className={listItemClasses}
        role='presentation'
        {...props}
      >
        {icon && iconPos === 'left' && (
          <Icon
            name={icon}
            className={listItemIconClasses}
            size={24}
          />
        )}
        <span className={`${styles.content} ${contentClassName}`}>
          {children}
        </span>
        {icon && iconPos === 'right' && (
          <Icon
            className={listItemIconClasses}
            style={iconStyle}
            name={icon}
            size={24}
          />
        )}
      </div>
    );
  }
}

ListItem.propTypes = {
  /** String or JSX element, text of list item */
  children: PropTypes.any,
  /** String or Number, value that will be passed to onClick handler */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** String, name of icon of list item */
  icon: PropTypes.string,
  /** String, position of icon related to text, left - before text, right - after text */
  iconPos: PropTypes.oneOf(['left', 'right']),
  /** String, className that will be added to icon */
  iconClassName: PropTypes.string,
  /** Function, will be called when list item clicked and get object with keys value and event as argument */
  onClick: PropTypes.func,
  /** Object, styles that will be added to icon */
  iconStyle: PropTypes.object,
  /** Boolean, whether list item render as disabled and onClick handler must not be called */
  disabled: PropTypes.bool,
  /** Boolean, whether list item render as active */
  active: PropTypes.bool,
  /** String, className that will be added to list item */
  className: PropTypes.string,
  /** String, className that will be added to list item's content */
  contentClassName: PropTypes.string,
};

ListItem.defaultProps = {
  value: '',
  children: '',
  icon: '',
  iconPos: 'right',
  iconStyle: undefined,
  disabled: false,
  active: false,
  iconClassName: '',
  onClick: undefined,
  className: '',
  contentClassName: '',
};
