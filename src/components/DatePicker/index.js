import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isMobile } from '../../utils';

import 'style-loader!css-loader?modules=false!react-day-picker/lib/style.css';
import styles from './datePicker.css';


export class DatePicker extends React.Component {
  render() {
    const { value = '', className, style, ...props } = this.props;

    const isNativeMode = isMobile();
    const datePickerClasses = classNames({
      [styles.datePicker]: true,
    });

    if (isNativeMode) {
      return null;
    }

    return (
      <div
        className={datePickerClasses}
        style={style}
        {...props}
      >
        {value}
      </div>
    );
  }

}

DatePicker.propTypes = {
  value: PropTypes.string,
};