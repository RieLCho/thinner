const elementsWithScrolls = (() => {
    const getComputedStyle = document.body && document.body.currentStyle
      ? (element) => element.currentStyle
      : (element) => document.defaultView.getComputedStyle(element, null);
  
    const getActualCss = (element, style) => getComputedStyle(element)[style];
  
    const isXScrollable = (element) =>
      element.offsetWidth < element.scrollWidth &&
      getActualCss(element, 'overflow-x') !== 'hidden' &&
      autoOrScroll(getActualCss(element, 'overflow-x'));
  
    const isYScrollable = (element) =>
      element.offsetHeight < element.scrollHeight &&
      getActualCss(element, 'overflow-y') !== 'hidden' &&
      autoOrScroll(getActualCss(element, 'overflow-y'));
  
    const autoOrScroll = (text) => text === 'scroll' || text === 'auto';

    const hasScroller = (element) => isYScrollable(element) || isXScrollable(element);
  
    return () => [].filter.call(document.querySelectorAll('*'), hasScroller);
  })();
  

const elements = elementsWithScrolls();
console.log(elements);
elements.map((v) => {
  const st = v.style;
  if (
    st.getPropertyValue("oveflow") === "hidden" ||
    st.getPropertyValue("overflow-y") === "hidden" ||
    st.getPropertyValue("overflow-x") === "hidden"
  ) {
    console.log("passed:", st);
    return;
  }
  return v.style.setProperty("scrollbar-width", "thin");
});

console.log("modified:", elements);
