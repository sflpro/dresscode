import React from 'react';
import PropTypes from 'prop-types';
import checkboxGroup from './checkboxGroup.css';

export function CheckboxGroup({title, children}) {
    return (
        <div>
            {title && <h5 className={checkboxGroup.title}>{title}</h5>}
            <div className={checkboxGroup.wrapper}>
                {children}
            </div>
        </div>
    );
}

CheckboxGroup.propTypes = {
    title:  PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
};

CheckboxGroup.defaultProps = {
    title: '',
};