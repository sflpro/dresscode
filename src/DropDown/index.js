import React from 'react';
import PropTypes from 'prop-types';

import { DropDownOptions } from './DropDownOptions';

import { Popover } from '../Popover';
import { Toggle } from '../Toggle';

export function DropDown({
  onStateChange,
  options,
  children,
  open,
  ...props
}) {
  return (
    <Toggle defaultState={open}>
      {({ state: isOpen, changeState }) => (
        <Popover
          onTargetEvent={(nextIsOpen) => {
            changeState(nextIsOpen);

            if (onStateChange) {
              onStateChange(nextIsOpen);
            }
          }}
          content={options}
          contentRelative
          trigger='click'
          open={isOpen}
          gap={8}
          {...props}
        >
          {children}
        </Popover>
      )}
    </Toggle>
  );
}

DropDown.propTypes = {
  /** JSX, content that will shown under button */
  options: PropTypes.any.isRequired,
  /** Function, called when dropdown state changed */
  onStateChange: PropTypes.func,
  /** Boolean, whether dropdown must be displayed */
  open: PropTypes.bool,
  /** Elements, content of dropdown tag */
  children: PropTypes.any.isRequired,
};

DropDown.defaultProps = {
  onStateChange: undefined,
  open: false,
};

DropDown.Options = DropDownOptions;
