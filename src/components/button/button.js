import React from 'react';

import buttons from './button.css';

export function Button (props) {
  return (
    <button className={buttons.primary} {...props} />
  );
}
