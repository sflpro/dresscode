import React from 'react';

import icon from './icon.css';

import icons from './svgSprite.svg';

let IE = false;
if (document.documentMode) {
  IE = true;
  const svgElem = document.createElement("div");
  svgElem.className = icon.svgIcons;
  const body = document.querySelector('body');

  const req = new XMLHttpRequest();
  req.addEventListener("load", function() {
    svgElem.innerHTML = this.responseText;
    body.appendChild(svgElem);
  });
  req.open("GET", icons);
  req.send();
}

export function Icon({ icon: iconName }) {
  const iconPath = IE ? '' : icons;
  return (
    <svg className={`${icon.icon}`}>
      <use xlinkHref={`${iconPath}#${iconName}`} />
    </svg>
  );
}
