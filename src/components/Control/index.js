import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SliderContext } from '../Slider';

import styles from './control.css';

export class Control extends React.Component {
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

  getLeftPosition(step) {
    const { wrapperElementWidth, maxStepsCount } = this.context;
    const { currentStep } = (this.state || {});

    const stepWidth = wrapperElementWidth / maxStepsCount;

    return (step || currentStep) * stepWidth - this.controlWidth / 2;
  }

  getCurrentValue() {
    const { getValueFromStep } = this.context;
    const { currentStep } = this.state;

    return getValueFromStep({ currentStep, min: this.min, max: this.max });
  }

  setControlRef = (ref) => {
    this.control = ref;
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
        {icon}
        <input type='hidden' name={name} value={value} />
      </span>
    );
  }
}

Control.propTypes = {
  /** Number, value of control */
  value: PropTypes.number.isRequired,
  /** String, name of control */
  name: PropTypes.string.isRequired,
  /** String or JSX or Element, icon element */
  icon: PropTypes.any.isRequired,
  /** String, classname that will be passed to wrapper span element */
  className: PropTypes.string,
  /** Function, will be called when control is held and started to move */
  onDragStart: PropTypes.func,
  /** Function, will be called when control is stopped moving and is not held */
  onDragEnd: PropTypes.func,
  /** Number, min value of control if not passed will get from Slider Component */
  min: PropTypes.number,
  /** Number, max value of control if not passed will get from Slider Component */
  max: PropTypes.number,
};

Control.defaultProps = {
  onDragStart: undefined,
  onDragEnd: undefined,
  min: undefined,
  max: undefined,
  className: '',
};
