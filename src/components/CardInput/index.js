import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from '../TextInput';

import masterCard from './icons/master.svg';
import empty from './icons/empty.svg';
import visa from './icons/visa.svg';
import arca from './icons/arca.svg';

const cardTypes = {
  masterCard,
  empty,
  visa,
  arca,
};

export class CardInput extends React.Component {
  static format(value) {
    const matches = value.replace(/ /g, '').match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }

    return value;
  }

  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      cardType: CardInput.getCardType(value),
      value: CardInput.format(value),
    };
  }

  static getDerivedStateFromProps({ value }, { cardType }) {
    return {
      cardType: CardInput.getCardType(value, cardType),
      value: CardInput.format(value),
    };
  }

  onKeyPress = (event) => {
    const { onKeyPress } = this.props;
    const { value } = this.state;

    const selection = window.getSelection();

    if (!/^\d+$/.test(event.key) || ((!selection || selection.toString() === '') && value.length === 19)) {
      event.preventDefault();
    }

    if (onKeyPress) {
      onKeyPress(event);
    }
  };

  onKeyDown = (event) => {
    const { target: { value, selectionStart } } = event;
    const { value: currentValue } = this.state;
    const { onKeyDown } = this.props;

    const position = selectionStart;
    let nextValue;

    if (event.keyCode === 46 && (position + 1) % 5 === 0) {
      const start = currentValue.substr(0, position);
      const end = currentValue.substr(position + 2, currentValue.length - position);

      nextValue = CardInput.format(`${start}${end}`);

      this.caretPosition = position;
    } else if (event.keyCode === 8 && position % 5 === 0) {
      const start = currentValue.substr(0, position - 2);
      const end = currentValue.substr(position, currentValue.length - position);

      nextValue = CardInput.format(`${start}${end}`);

      this.caretPosition = position - 1;

      if (nextValue.length === value.length - 1) {
        this.caretPosition--;
      }
    }

    if (nextValue) {
      this.emitChange(nextValue);
      event.preventDefault();
    }

    onKeyDown(event);
  };

  onChange = (event) => {
    const { currentTarget: { value } } = event;
    const { value: currentValue } = this.state;
    const nextValue = CardInput.format(value);

    this.caretPosition = event.target.selectionStart;

    if (this.caretPosition % 5 === 0 && currentValue.length < value.length) {
      if (this.caretPosition === value.length) {
        this.caretPosition += 2;
      } else {
        this.caretPosition += 1;
      }
    }

    this.emitChange(nextValue);
  };

  static getCardType(value, cardType) {
    let nextCardType = cardType;

    const firstDigit = +value[0];
    const firstTwoDigit = +value.substr(0, 2);
    const firstFourDigit = +value.substr(0, 4);

    if (firstDigit === 4) {
      nextCardType = 'visa';
    } else if (
      (firstTwoDigit > 50 && firstTwoDigit < 56)
      || (firstFourDigit > 2220 && firstFourDigit < 2721)
    ) {
      nextCardType = 'masterCard';
    } else if (nextCardType !== 'empty') {
      nextCardType = 'empty';
    }

    return nextCardType;
  }

  updateCaretPosition = () => {
    this.input.focus();
    this.input.setSelectionRange(this.caretPosition, this.caretPosition);
  };

  setInputRef = (ref) => {
    this.input = ref;
  };

  emitChange(value) {
    const { name, onChange } = this.props;

    this.updateCaretPosition();
    onChange({ name, value: value.replace(/ /g, '') });
  }

  render() {
    const { cardType, value } = this.state;

    return (
      <TextInput
        {...this.props}
        placeholder='____ ____ ____ ____'
        onKeyPress={this.onKeyPress}
        onKeyDown={this.onKeyDown}
        setRef={this.setInputRef}
        onChange={this.onChange}
        icon={(
          <img
            src={cardTypes[cardType]}
            alt='card-icon'
          />
        )}
        value={value}
      />
    );
  }
}

CardInput.propTypes = {
  /** Function, will be called when input is focused and any key pressed */
  onKeyPress: PropTypes.func,
  /** Function, will be called when input is focused and any key pressed down */
  onKeyDown: PropTypes.func,
  /** Function, will be called when input value changed */
  onChange: PropTypes.func,
  /** String, value of input */
  value: PropTypes.string,
  /** String, name of input */
  name: PropTypes.string,
};

CardInput.defaultProps = {
  onKeyPress: undefined,
  onKeyDown: undefined,
  onChange: undefined,
  value: '',
  name: '',
};
