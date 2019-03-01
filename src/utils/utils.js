import MobileDetect from 'mobile-detect';

export function isMobile() {
  return !!new MobileDetect(window.navigator.userAgent).mobile();
}