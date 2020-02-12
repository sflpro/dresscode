import React from 'react';
import PropTypes from 'prop-types';

import { isPassiveEventSupported } from '../utils';

export class InfiniteScroll extends React.Component {
  componentDidMount() {
    this.options = this.eventListenerOptions();
    this.attachScrollListener();
    this.scrollListener();
  }

  componentDidUpdate() {
    const { reverse } = this.props;

    if (reverse && this.loadMore) {
      const parentElement = this.getParentElement(this.scrollComponent);
      parentElement.scrollTop = parentElement.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop;
      this.loadMore = false;
    }

    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  getParentElement(el) {
    const { getScrollParent } = this.props;

    if (typeof getScrollParent === 'function') {
      return getScrollParent();
    }

    return el && el.parentNode;
  }

  mousewheelListener = (e) => {
    // Prevents Chrome hangups
    // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
    if (e.deltaY === 1 && !isPassiveEventSupported()) {
      e.preventDefault();
    }
  };

  scrollListener = () => {
    const {
      useWindow,
      reverse,
      threshold,
      loadMore,
      hasMore,
    } = this.props;
    const el = this.scrollComponent;
    const scrollEl = window;
    const parentNode = this.getParentElement(el);
    let offset;

    if (!hasMore) {
      this.detachScrollListener();
      return;
    }

    if (useWindow) {
      const doc = document.documentElement || document.body.parentNode || document.body;
      const scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;

      if (reverse) {
        offset = scrollTop;
      } else {
        offset = this.calculateOffset(el, scrollTop);
      }
    } else if (reverse) {
      offset = parentNode.scrollTop;
    } else {
      offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
    }

    if (offset < Number(threshold) && (el && el.offsetParent !== null)) {
      this.detachScrollListener();
      this.beforeScrollHeight = parentNode.scrollHeight;
      this.beforeScrollTop = parentNode.scrollTop;

      if (typeof loadMore === 'function') {
        loadMore();
        this.loadMore = true;
      }
    }
  };

  eventListenerOptions = () => {
    const { useCapture } = this.props;
    let options = useCapture;

    if (isPassiveEventSupported()) {
      options = {
        useCapture,
        passive: true,
      };
    } else {
      options = {
        passive: false,
      };
    }
    return options;
  };

  getRef = (node) => {
    const { ref } = this.props;
    this.scrollComponent = node;

    if (ref) {
      ref(node);
    }
  };

  detachScrollListener() {
    let scrollElement;

    const {
      useWindow,
      useCapture,
    } = this.props;

    if (useWindow) {
      scrollElement = window;
    } else {
      scrollElement = this.getParentElement(this.scrollComponent);
    }

    scrollElement.removeEventListener(
      'scroll',
      this.scrollListener,
      this.options ? this.options : useCapture,
    );
    scrollElement.removeEventListener(
      'resize',
      this.scrollListener,
      this.options ? this.options : useCapture,
    );
    scrollElement.removeEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.options ? this.options : useCapture,
    );
  }

  attachScrollListener() {
    const parentElement = this.getParentElement(this.scrollComponent);

    const {
      hasMore,
      useWindow,
      useCapture,
    } = this.props;

    if (!hasMore || !parentElement) {
      return;
    }

    let scrollEl;

    if (useWindow) {
      scrollEl = window;
    } else {
      scrollEl = parentElement;
    }

    scrollEl.addEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.options ? this.options : useCapture,
    );
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      this.options ? this.options : useCapture,
    );
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
      this.options ? this.options : useCapture,
    );
  }

  calculateOffset(el, scrollTop) {
    if (!el) {
      return 0;
    }

    return (this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight));
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  render() {
    const {
      children,
      element: Element,
      hasMore,
      reverse,
      loadMore,
      ref,
      threshold,
      useCapture,
      useWindow,
      getScrollParent,
      ...props
    } = this.props;

    return (
      <Element
        {...props}
        ref={this.getRef}
      >
        {children}
      </Element>
    );
  }
}

InfiniteScroll.propTypes = {
  /** String or JSX or Element, content of element */
  children: PropTypes.any.isRequired,
  /** Function, A callback when more items are requested by the user.
   *  Receives a single parameter specifying the page to load e.g.
   *  function handleLoadMore(page) { load more items here }
   */
  loadMore: PropTypes.func.isRequired,
  /** Boolean, Whether there are more items to be loaded. Event listeners are removed if false. */
  hasMore: PropTypes.bool,
  /** Boolean, Whether new items should be loaded when user scrolls to the top of the scrollable area. */
  reverse: PropTypes.bool,
  /** String, className that will be added to container element */
  className: PropTypes.string,
  /** Function, Override method to return a different scroll listener
   *  if it's not the immediate parent of InfiniteScroll.
   */
  getScrollParent: PropTypes.func,
  /** Number, The distance in pixels before the end of the items that will trigger a call to loadMore. */
  threshold: PropTypes.number,
  /** Boolean, Proxy to the useCapture option of the added event listeners. */
  useCapture: PropTypes.bool,
  /** Boolean, Add scroll listeners to the window, or else, the component's parentNode */
  useWindow: PropTypes.bool,
  /** String or JSX or Element, Name of the element that the component should render as. */
  element: PropTypes.node,
  /** Function, Override ref to get scrollComponent reference. */
  ref: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  element: 'div',
  className: '',
  hasMore: false,
  ref: null,
  threshold: 250,
  useWindow: false,
  reverse: false,
  useCapture: false,
  getScrollParent: null,
};
