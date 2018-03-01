browser.runtime.getPlatformInfo().then(function(info) {
  const isMac = info.os === "mac";

  browser.runtime.onMessage.addListener(function(message) {
    if (message.shiftKey) {
      browser.windows.create({
        url: message.url
      });
    } else {
      // ctrl+click opens a context menu on Mac, so don't create the new tab.
      const shouldOpenTab = !(isMac && message.ctrlKey);

      if (shouldOpenTab) {
        browser.tabs.create({
          url: message.url,
          active: false
        });
      }
    }
  });
});