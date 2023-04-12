const modifyElementWithScrollbar = (element) => {
  const computedStyle = window.getComputedStyle(element);
  if (
    computedStyle.getPropertyValue("overflow") === "hidden" ||
    computedStyle.getPropertyValue("overflow-y") === "hidden" ||
    computedStyle.getPropertyValue("overflow-x") === "hidden"
  ) {
    return;
  }
  return element.style.setProperty("scrollbar-width", "thin");
};

// Select all elements with scrollbars that don't have overflow:hidden set
const elements = document.querySelectorAll('*:not([style*="overflow: hidden"]):not([style*="overflow-y: hidden"]):not([style*="overflow-x: hidden"]):not([style*="scrollbar-width: thin"])');

// Modify the style of the selected elements
elements.forEach((element) => {
  modifyElementWithScrollbar(element);
});

// Create a mutation observer to monitor the document for changes
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      const newElements = [];
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const nodesWithScrollbars = node.querySelectorAll('*:not([style*="overflow: hidden"]):not([style*="overflow-y: hidden"]):not([style*="overflow-x: hidden"]):not([style*="scrollbar-width: thin"])');
          nodesWithScrollbars.forEach((element) => {
            modifyElementWithScrollbar(element);
            newElements.push(element);
          });
        }
      });
    }
  }
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
