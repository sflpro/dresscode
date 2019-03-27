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

    const { onChange, step, min, max } = this.props;
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
      wrapperLeftOffset: wrapperElement.offsetLeft,
    });
  }

  setControlInfo = ({ name, value, left }) => {
    this.setState(prevState => ({ controls: { ...prevState.controls, [name]: { name, value, left } } }));
  };

  setSliderRef = (ref) => {
    this.slider = ref;
  };

  onResize() {
    if (this.slider) {
      setTimeout(() => {
        this.setWrapperParams(this.slider);
      }, 0);
    }
  }

  render() {
    const { className, children, step, min, max, onChange, distance } = this.props;
    const { wrapperElementWidth, maxStepsCount } = this.state;

    const sliderLineStyles = this.getSliderLineStyles();

    const sliderClassName = classNames({
      [styles.slider]: true,
      [className]: true,
    });

    return (
      <div className={styles.wrapper}>
        <div
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
              wrapperElementWidth,
              maxStepsCount,
              distance,
              onChange,
              step,
              min,
              max,
            }}
          >
            {Array.isArray(children) ? children.slice(0, 2).filter(child => child.type.name === 'SliderControl') : children}
          </SliderContext.Provider>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  distance: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

Slider.defaultProps = {
  distance: 1,
  step: 1,
  min: 0,
  max: 100,
};
