import React from 'react';
import PropTypes from 'prop-types';

export function Toggle({ children, defaultState = false }) {
  const [state, setState] = React.useState(defaultState);

  return children({
    toggle: () => setState(prevState => !prevState),
    changeState: nextState => setState(nextState),
    state,
  });
}

Toggle.propTypes = {
  /** JSX, content that will shown under button */
  defaultState: PropTypes.bool,
  /** Function, will get state, toggle and changeState */
  children: PropTypes.any.isRequired,
};

Toggle.defaultProps = {
  defaultState: false,
};
