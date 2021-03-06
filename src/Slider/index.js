import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash.throttle';

import styles from './slider.css';

export const SliderContext = React.createContext({
  wrapperLeftOffset: 0,
  maxStepsCount: 0,
  stepWidth: 0,
  step: 0,
  min: 0,
  max: 0,
});

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    const { min, max, step } = this.props;

    this.state = {
      maxStepsCount: Math.round(Math.abs(max - min) / step),
      wrapperElementWidth: 0,
      wrapperLeftOffset: 0,
      controls: {},
    };

    this.onResizeThrottled = throttle(this.onResize.bind(this), 100);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { min, max, step } = nextProps;

    const maxStepsCount = Math.round(Math.abs(max - min) / step);

    if (maxStepsCount !== prevState.maxStepsCount) {
      return { maxStepsCount };
    }

    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeThrottled);

    this.setWrapperParams(this.slider);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeThrottled);
  }

  onSliderClick = (event) => {
    if (event.type === 'mousemove') {
      event.preventDefault();
    }

    const { onChange, step, min, max, disabled } = this.props;
    if (disabled) {
      return;
    }

    const { maxStepsCount, controls } = this.state;

    const [minControlName, maxControlName] = Object.keys(controls);
    const [minControl, maxControl] = Object.values(controls);

    const nextStep = this.getStepFromEvent({ event, maxStepsCount });

    const params = { currentStep: nextStep, step, min, max };
    const minStep = minControl && this.getStepFromValue({ value: minControl.value, min, step });
    const maxStep = maxControl && this.getStepFromValue({ value: maxControl.value, min, step });

    if (maxStep && minStep && Math.abs(maxStep - nextStep) < Math.abs(nextStep - minStep)) {
      onChange({ name: maxControlName, value: this.getValueFromStep(params) });
    } else {
      onChange({ name: minControlName, value: this.getValueFromStep(params) });
    }
  };

  onChange = ({ name, value }) => {
    const { onChange, distance } = this.props;
    const { controls } = this.state;

    const [minControl, maxControl] = Object.values(controls);

    if (maxControl) {
      if (name === minControl.name && value === maxControl.value) {
        onChange({ name, value: value - distance });
        return;
      }

      if (name === maxControl.name && value === minControl.value) {
        onChange({ name, value: value + distance });
        return;
      }
    }

    onChange({ name, value });
  };

  onResize() {
    if (this.slider) {
      setTimeout(() => {
        this.setWrapperParams(this.slider);
      }, 0);
    }
  }

  getSliderLineStyles() {
    const { controls } = this.state;
    const [minControl, maxControl] = Object.values(controls);
    const sliderLineStyles = {};

    if (maxControl) {
      sliderLineStyles.left = `${minControl.left}px`;
      sliderLineStyles.width = `${maxControl.left - minControl.left}px`;
    } else if (minControl) {
      sliderLineStyles.width = `${minControl.left}px`;
    }

    return sliderLineStyles;
  }

  getValueFromStep = ({ currentStep, min, max }) => {
    const { min: propsMin, step } = this.props;

    const value = currentStep * step + propsMin;

    return value > max ? max : value < min ? min : value;
  };

  getStepFromEvent = ({ event }) => {
    const { wrapperLeftOffset, wrapperElementWidth, maxStepsCount } = this.state;

    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const stepWidth = wrapperElementWidth / maxStepsCount;

    return Math.round((clientX - wrapperLeftOffset) / stepWidth);
  };

  getStepFromValue = ({ value }) => {
    const { min, step } = this.props;

    return Math.round((value - min) / step);
  };

  setWrapperParams(wrapperElement) {
    this.setState({
      wrapperElementWidth: wrapperElement.clientWidth,
      wrapperLeftOffset: wrapperElement.getBoundingClientRect().left,
    });
  }

  setControlInfo = ({ name, value, left }) => {
    this.setState(prevState => ({ controls: { ...prevState.controls, [name]: { name, value, left } } }), () => {
      const { onControlChange } = this.props;
      const { controls } = this.state;

      if (onControlChange) {
        onControlChange(Object.values(controls));
      }
    });
  };

  setSliderRef = (ref) => {
    this.slider = ref;
  };

  render() {
    const {
      onControlChange,
      className,
      children,
      step,
      min,
      max,
      distance,
      disabled,
      ...props
    } = this.props;

    const {
      wrapperElementWidth,
      maxStepsCount,
    } = this.state;

    const sliderLineStyles = this.getSliderLineStyles();

    const sliderClassName = classNames({
      [styles.slider]: true,
      [styles.disabled]: disabled,
      [className]: true,
    });

    return (
      <div className={styles.wrapper}>
        <div
          {...props}
          role='presentation'
          onTouchEnd={this.onSliderClick}
          onClick={this.onSliderClick}
          className={sliderClassName}
          ref={this.setSliderRef}
        >
          {(!Array.isArray(children) || children.length <= 2) && (
            <span className={styles.sliderLine} style={sliderLineStyles} />
          )}
          <SliderContext.Provider
            value={{
              getValueFromStep: this.getValueFromStep,
              getStepFromValue: this.getStepFromValue,
              getStepFromEvent: this.getStepFromEvent,
              setControlInfo: this.setControlInfo,
              onChange: this.onChange,
              wrapperElementWidth,
              maxStepsCount,
              distance,
              step,
              min,
              max,
            }}
          >
            {children}
          </SliderContext.Provider>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  /** Function, called when slider value is changed */
  onChange: PropTypes.func.isRequired,
  /** Function, called when control value is changed */
  onControlChange: PropTypes.func,
  /** Number, min difference between controls values */
  distance: PropTypes.number,
  /** Number, amount of change per step */
  step: PropTypes.number,
  /** Boolean, whether slider is disabled */
  disabled: PropTypes.bool,
  /** Number, min value of input */
  min: PropTypes.number,
  /** Number, max value of input */
  max: PropTypes.number,
  /** String, className that will be added to target div */
  className: PropTypes.string,
  /** Object, style that will be added to target div */
  style: PropTypes.object,
  /** Control Element(s), content of slider */
  children: PropTypes.any,
};

Slider.defaultProps = {
  onControlChange: undefined,
  distance: 1,
  step: 1,
  disabled: false,
  min: 0,
  max: 100,
  className: '',
  style: undefined,
  children: null,
};
