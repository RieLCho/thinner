const elementsWithScrolls = (() => {
    const getComputedStyle = document.body && document.body.currentStyle
      ? (elem) => elem.currentStyle
      : (elem) => document.defaultView.getComputedStyle(elem, null);
  
    const getActualCss = (elem, style) => getComputedStyle(elem)[style];
  
    const isXScrollable = (elem) =>
      elem.offsetWidth < elem.scrollWidth &&
      getActualCss(elem, 'overflow-x') !== 'hidden' &&
      autoOrScroll(getActualCss(elem, 'overflow-x'));
  
    const isYScrollable = (elem) =>
      elem.offsetHeight < elem.scrollHeight &&
      getActualCss(elem, 'overflow-x') !== 'hidden' &&
      autoOrScroll(getActualCss(elem, 'overflow-y'));
  
    const autoOrScroll = (text) => text === 'scroll' || text === 'auto';
  
    const hasScroller = (elem) => isYScrollable(elem) || isXScrollable(elem);
  
    return () => [].filter.call(document.querySelectorAll('*'), hasScroller);
  })();
  

const el = elementsWithScrolls();
console.log(el);
el.map((v) => {
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

console.log("modified:", el);
