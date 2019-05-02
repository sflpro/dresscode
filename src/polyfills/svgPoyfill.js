import { isIE } from '../helpers/isIE';

export const svgPolyfill = (doc, iconPath) => {
  const App = {};
  App.ajax = (loopObj, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', loopObj, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const response = request.responseText;
        if (typeof callback === 'function') {
          callback(response);
        }
      } else {
        console.log('Error reaching the server');
      }
    };

    request.onerror = () => {
      console.log('Connection error');
    };
    request.send();
  };

  App.init = () => {
    const fragment = doc.createElement('div');

    fragment.style.display = 'none';
    fragment.style.position = 'absolute';
    fragment.style.top = '0';
    fragment.style.left = '0';
    doc.body.insertBefore(fragment, doc.body.childNodes[0]);

    App.ajax(iconPath, (response) => {
      fragment.innerHTML += response;
    });
  };

  return isIE() && doc.addEventListener('DOMContentLoaded', () => App.init());
};
