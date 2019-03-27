import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SliderContext } from '../Slider';
import { Icon } from '../Icon';

import styles from './sliderControl.css';

export class SliderControl extends React.Component {
  static contextType = SliderContext;

  constructor(props, context) {
    super(props, context);

    const { getStepFromValue } = this.context;
    const { value } = this.props;

    const currentStep = getStepFromValue({ value });

    this.state = {
      left: this.getLeftPosition(currentStep),
      currentStep,
    };
  }

  componentDidMount() {
    this.emitChange();
  }

  componentDidUpdate(prevProps, prevState) {
    const { getStepFromValue } = this.context;
    const { left, currentStep } = this.state;
    const { value } = this.props;

    const nextStep = getStepFromValue({ value });
    const nextLeft = this.getLeftPosition();

    if (nextStep !== currentStep) {
      this.setState({ currentStep: nextStep, left: this.getLeftPosition(nextStep) });
    }

    if (nextLeft !== left) {
      this.setState({ left: nextLeft });
    }

    if (left !== prevState.left) {
      this.emitChange();
    }
  }

  get controlWidth() {
    return this.control ? this.control.clientWidth : 16;
  }

  get min() {
    const { min: sliderMin } = this.context;
    const { min } = this.props;

    return min || sliderMin;
  }

  get max() {
    const { max: sliderMax } = this.context;
    const { max } = this.props;

    return max || sliderMax;
  }

  onMouseMove = (event) => {
    if (event.type === 'mousemove') {
      event.preventDefault();
    }

    const { onChange, getStepFromEvent, getStepFromValue } = this.context;
    const { currentStep } = this.state;
    const { name } = this.props;

    let nextStep = getStepFromEvent({ event });

    const minStep = getStepFromValue({ value: this.min });
    const maxStep = getStepFromValue({ value: this.max });

    if (nextStep < minStep) {
      nextStep = minStep;
    }

    if (nextStep > maxStep) {
      nextStep = maxStep;
    }

    if (nextStep !== currentStep) {
      this.setState({ currentStep: nextStep, left: this.getLeftPosition(nextStep) }, () => {
        onChange({ name, value: this.getCurrentValue() });
      });
    }
  };

  onMouseDown = (event) => {
    const { onDragStart, name } = this.props;
    const { currentStep, left } = this.state;

    this.addListeners();

    if (onDragStart && typeof onDragStart === 'function') {
      onDragStart(event, { name, value: this.getCurrentValue(), currentStep, left });
    }
  };

  onMouseUp = (event) => {
    const { currentStep, left } = this.state;
    const { onDragEnd, name } = this.props;

    this.removeListeners();

    if (onDragEnd && typeof onDragEnd === 'function') {
      onDragEnd(event, { name, value: this.getCurrentValue(), currentStep, left });
    }
  };

  emitChange() {
    const { setControlInfo } = this.context;
    const { value, name } = this.props;
    const { left } = this.state;

    setControlInfo({ name, value, left: left + this.controlWidth / 2 });
  }

  addListeners() {
    document.addEventListener('touchmove', this.onMouseMove, true);
    document.addEventListener('mousemove', this.onMouseMove, true);
    document.addEventListener('touchend', this.onMouseUp, true);
    document.addEventListener('mouseup', this.onMouseUp, true);
  }

  removeListeners() {
    document.removeEventListener('touchmove', this.onMouseMove, true);
    document.removeEventListener('mousemove', this.onMouseMove, true);
    document.removeEventListener('touchend', this.onMouseUp, true);
    document.removeEventListener('mouseup', this.onMouseUp, true);
  }

  getLeftPosition(step) {
    const { wrapperElementWidth, maxStepsCount } = this.context;

    const stepWidth = wrapperElementWidth / maxStepsCount;

    return (step || this.state.currentStep) * stepWidth - this.controlWidth / 2;
  }

  getCurrentValue() {
    const { getValueFromStep } = this.context;
    const { currentStep } = this.state;

    return getValueFromStep({ currentStep, min: this.min, max: this.max });
  }

  setControlRef = (ref) => {
    this.control = ref;
  };

  render() {
    const { className, value, name, icon } = this.props;
    const { left } = this.state;

    const controlClassNames = { [styles.control]: true };

    if (className) {
      controlClassNames[className] = true;
    }

    const sliderStyles = { left: `${left}px` };

    return (
      <span
        className={classNames(controlClassNames)}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
        ref={this.setControlRef}
        style={sliderStyles}
        role='presentation'
      >
        {typeof icon === 'string' ? (
          <Icon name={icon} className={styles.controlSvg} />
        ) : (
          icon
        )}
        <input type='hidden' name={name} value={value} />
      </span>
    );
  }
}

SliderControl.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  icon: PropTypes.any,
};

SliderControl.defaultProps = {
  icon: 'slider-icon',
  min: undefined,
  max: undefined,
  className: '',
};
