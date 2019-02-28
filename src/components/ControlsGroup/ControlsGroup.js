import React from 'react';
import PropTypes from 'prop-types';
import controlsGroup from './controlsGroup.css';

export function ControlsGroup({title, children}) {
    return (
        <div>
            {title && <h5 className={controlsGroup.title}>{title}</h5>}
            <div className={controlsGroup.wrapper}>
                {children}
            </div>
        </div>
    );
}

ControlsGroup.propTypes = {
    title:  PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
};

ControlsGroup.defaultProps = {
    title: '',
};