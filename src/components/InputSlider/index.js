import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from '../TextInput';
import { Slider } from '../Slider';

export class InputSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minControl: {
        name: '',
        value: 0,
      },
      maxControl: {
        name: '',
        value: '',
      },
      value: '',
      hasError: false,
    };
  }

  onKeyPress = (event) => {
    const { separator, inputProps: { onKeyPress }, children } = this.props;
    const { value } = this.state;

    const isRange = Array.isArray(children) && children.length === 2;

    if (!/^\d+$/.test(event.key) && (!isRange || (!separator.includes(event.key) && event.key !== ' ')) && event.key !== '-') {
      event.preventDefault();
    }

    if (isRange && separator !== '-' && event.key === separator && value.includes(separator)) {
      event.preventDefault();
    }

    if (isRange && separator === '-' && event.key === separator && (value.match(new RegExp(separator, 'g')) || []).length === 3) {
      event.preventDefault();
    }

   if (onKeyPress) {
     onKeyPress(event);
   }
  };

  onChange = (event) => {
    const { inputProps: { onChange } } = this.props;

    const { currentTarget: { value }} = event;

    this.setState({ value });

    if (onChange) {
      onChange(event);
    }
  };

  onBlur = (event) => {
    const { min, max, distance, inputProps: { onBlur }, separator, children } = this.props;
    const { minControl, maxControl, value } = this.state;

    const nextState = { minControl: { ...minControl }, maxControl: { ...maxControl }, hasError: false };
    const isRange = Array.isArray(children) && children.length === 2;
    const valueWithoutSpaces = value.replace(/ /g, '');
    let hasError = false;

    let minControlValue;
    let maxControlValue;

    if (isRange) {
      if (!valueWithoutSpaces.includes(separator)) {
        hasError = true;
      } else {
        const separatorIndexes = [];

        for(let i = 0; i < valueWithoutSpaces.length;i++) {
          if (valueWithoutSpaces[i] === separator) {
            separatorIndexes.push(i);
          }
        }

        let separatorIndex;

        switch (separatorIndexes.length) {
          case 3:
            separatorIndex = separatorIndexes[1];
            break;

          case 2:
            if (separatorIndexes[0] === 0) {
              separatorIndex = separatorIndexes[1];
            } else {
              separatorIndex = separatorIndexes[0];
            }
            break;

          default:
          case 1:
            separatorIndex = separatorIndexes[0];
            break;
        }

        minControlValue = +valueWithoutSpaces.substring(0, separatorIndex);
        maxControlValue = +valueWithoutSpaces.substring(separatorIndex + 1);
      }
    } else {
      minControlValue = +value.trim();
    }

    if (hasError || Number.isNaN(minControlValue) || (isRange && Number.isNaN(maxControlValue))) {
      this.setState({ hasError: true });
      return;
    }

    nextState.minControl.value = minControlValue;

    if (maxControlValue) {
      nextState.maxControl.value = maxControlValue;
    }

    if (Number.isNaN(nextState.minControl.value)) {
      nextState.minControl.value = min;
    }

    if (Number.isNaN(nextState.maxControl.value)) {
      nextState.maxControl.value = max;
    }

    if (nextState.minControl.value < min) {
      nextState.minControl.value = min;
    }

    if (nextState.minControl.value > max) {
      nextState.minControl.value = max;
    }

    if (nextState.maxControl) {
      if (nextState.maxControl.value < min) {
        nextState.maxControl.value = min;
      }

      if (nextState.maxControl.value > max) {
        nextState.maxControl.value = max;
      }

      if (nextState.maxControl.value <= nextState.minControl.value) {
        nextState.maxControl.value = nextState.minControl.value + distance;
      }

      if (nextState.minControl.value >= nextState.maxControl.value) {
        nextState.minControl.value = nextState.maxControl.value - distance;
      }
    }

    nextState.value = (nextState.maxControl
      ? `${nextState.minControl.value} ${separator} ${nextState.maxControl.value}`
      : nextState.minControl.value).toString();

    this.setState(nextState, this.emitValue);

    if (onBlur) {
      onBlur(event);
    }
  };

  setMinMax = ([minControl, maxControl]) => {
    const { separator } = this.props;

    const value = ((maxControl && maxControl.value)
      ? `${minControl.value} ${separator} ${maxControl.value}`
      : minControl.value).toString();

    this.setState({ minControl, maxControl, value });
  };

  emitValue = () => {
    const { minControl, maxControl } = this.state;
    const { onChange } = this.props;

    onChange(minControl);
    onChange(maxControl);
  };

  render() {
    const { children, separator, style, inputProps, className, ...props } = this.props;
    const { value, hasError } = this.state;

    return (
      <div style={style} className={className}>
        <TextInput
          {...inputProps}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          onBlur={this.onBlur}
          hasError={hasError}
          value={value}
        />
        <Slider {...props} onControlChange={this.setMinMax}>
          {children}
        </Slider>
      </div>
    );
  }
}

InputSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  separator: PropTypes.string,
  className: PropTypes.string,
  distance: PropTypes.number,
  style: PropTypes.object,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

InputSlider.defaultProps = {
  separator: '-',
  inputProps: {},
  className: '',
  distance: 1,
  style: {},
  step: 1,
  min: 0,
  max: 100,
};
