export function isMobile() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

export const getDebounce = (func, wait) => {
  let timeout;

  return function debounce(...args) {
    const context = this;
    const later = () => {
      timeout = null;

      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const isPassiveEventSupported = () => {
  let passive = false;

  const testOptions = {
    get passive() {
      passive = true;
      return true;
    },
  };

  try {
    document.addEventListener('test', null, testOptions);
    document.removeEventListener('test', null, testOptions);
  } catch (e) {
    return false;
  }
  return passive;
};
