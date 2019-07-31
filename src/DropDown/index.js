import React from 'react';
import PropTypes from 'prop-types';

import { DropDownOptions } from './DropDownOptions';

import { Popover } from '../Popover';
import { Toggle } from '../Toggle';

export function DropDown({
  onClick,
  options,
  children,
  ...props
}) {
  return (
    <Toggle>
      {({ state: isOpen, changeState }) => (
        <Popover
          onTargetEvent={(nextIsOpen) => {
            changeState(nextIsOpen);

            if (onClick) {
              onClick();
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
  /** Function, called when dropdown is clicked or items are closed */
  onClick: PropTypes.func,
  /** Elements, content of dropdown tag */
  children: PropTypes.any.isRequired,
};

DropDown.defaultProps = {
  onClick: undefined,
};

DropDown.Options = DropDownOptions;
