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
  if (e.button === 0 && (e.metaKey || e.ctrlKey || e.shiftKey)) {
    
    const target = clickedLink(e.target);
    const href = target && target.href && target.href.trim();
    const hrefAttr = target && target.getAttribute("href");
    const shouldHandleClick = href && hrefAttr && !href.startsWith("javascript:") && hrefAttr !== "#";
    
    if (shouldHandleClick) {
      e.preventDefault();
      e.stopImmediatePropagation();

      browser.runtime.sendMessage({
        "url": target.href,
        "metaKey": e.metaKey,
        "ctrlKey": e.ctrlKey,
        "shiftKey": e.shiftKey
      });
    }
  }
}, true);  
