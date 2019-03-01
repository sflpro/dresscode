import React from 'react';
import PropTypes from 'prop-types';


import styles from './icon.css';
import icons from './svgSprite.svg';


let IE = false;
if (document.documentMode) {
  IE = true;
  const svgElem = document.createElement("div");
  svgElem.className = styles.svgIcons;
  const body = document.querySelector('body');

  const req = new XMLHttpRequest();
  req.addEventListener("load", function() {
    svgElem.innerHTML = this.responseText;
    body.appendChild(svgElem);
  });
  req.open("GET", icons);
  req.send();
}

export function Icon({ name: iconName }) {
  const iconPath = IE ? '' : icons;
  return (
    <svg className={`${styles.icon}`}>
      <use xlinkHref={`${iconPath}#${iconName}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequried,
};
