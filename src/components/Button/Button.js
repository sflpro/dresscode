import React from 'react';

import buttons from './button.css';

export function Button(props) {
  return (
    <button type='button' className={buttons.primary} {...props} />
  );
}
