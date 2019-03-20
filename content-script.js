function clickedLink(node) {
  if (!node) {
    return null;
  } else if (node.tagName === "A") {
    return node;
  } else {
    return clickedLink(node.parentNode);
  }
}

window.addEventListener("click", function(e) {
  const wasMiddleClick = e.button === 1;
  const wasModifiedLeftClick = e.button === 0 && (e.metaKey || e.ctrlKey || e.shiftKey);
  
  if (wasMiddleClick || wasModifiedLeftClick) {
    
    const target = clickedLink(e.target);
    const href = target && target.href && target.href.trim();
    const hrefAttr = target && target.getAttribute("href");
    const shouldHandleClick = href && hrefAttr && !hrefAttr.startsWith("javascript:") && hrefAttr !== "#";
    
    if (shouldHandleClick) {
      e.preventDefault();
      e.stopImmediatePropagation();

      chrome.runtime.sendMessage({
        "url": target.href,
        "metaKey": e.metaKey,
        "ctrlKey": e.ctrlKey,
        "shiftKey": e.shiftKey
      });
    }
  }
}, true);  
