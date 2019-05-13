import PropTypes from 'prop-types';

export function Toggle({
  children,
}) {
  return children;
}

Toggle.propTypes = {
  /** JSX element for showing dropdown button */
  children: PropTypes.any,
};

Toggle.defaultProps = {
  children: null,
};
