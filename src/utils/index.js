export function isMobile() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

export const TRIGGER_OPTIONS = {
  CLICK: 'click',
  HOVER: 'hover',
};