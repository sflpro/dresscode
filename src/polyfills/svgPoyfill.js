(function (doc) {
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
    const svgUse = doc.querySelectorAll('svg > use');
    const fragment = doc.createElement('div');
    const svgUrlsArr = [];

    fragment.style.display = 'none';
    fragment.style.position = 'absolute';
    fragment.style.top = '0';
    fragment.style.left = '0';
    doc.body.insertBefore(fragment, doc.body.childNodes[0]);

    for (let i = 0; i < svgUse.length; i++) {
      const obj = svgUse[i];
      const attr = obj.getAttribute('xlink:href').split('#');
      const url = attr[0];
      const hash = attr[1];

      if (url) {
        svgUrlsArr.push(url);
        obj.setAttribute('xlink:href', `#${hash}`);
      }
    }

    const svgUrls = svgUrlsArr.filter((item, pos) => svgUrlsArr.indexOf(item) === pos);
    for (let j = 0; j < svgUrls.length; j++) {
      const loopObj = svgUrls[j];
      App.ajax(loopObj, (response) => {
        fragment.innerHTML += response;
      });
    }
  };

  /MSIE|Trident/.test(navigator.userAgent) &&
  doc.addEventListener('DOMContentLoaded', () => App.init());
})(document);
