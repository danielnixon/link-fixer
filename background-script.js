const dropWhile = (f, xs) => xs.length ? dropWhileNotEmpty(f, xs) : [];
const dropWhileNotEmpty = (f, [x, ...xs]) =>  f(x) ? dropWhile(f, xs) : [x, ...xs];
const takeWhile = (f, xs) => xs.length ? takeWhileNotEmpty(f, xs) : [];
const takeWhileNotEmpty = (f, [x, ...xs]) =>  f(x) ? [x, ...takeWhile(f, xs)] : [];

const tabPositions = {
  relatedAfterCurrent: function(senderTab, tabs) {
    const tabsAfterSenderTab = dropWhile(tab => tab.index <= senderTab.index, tabs);
    const tabsOpenedBySenderTab = takeWhile(tab => tab.openerTabId !== undefined && tab.openerTabId === senderTab.id, tabsAfterSenderTab);
    const lastTabOpenedBySenderTab = tabsOpenedBySenderTab.slice(-1)[0];
    return lastTabOpenedBySenderTab ? lastTabOpenedBySenderTab.index + 1 : undefined;
  },
  afterCurrent: (senderTab) => senderTab.index + 1,
  atEnd: () => Number.MAX_SAFE_INTEGER
};

const calculateNewTabIndex = function(senderTab, tabs) {
  if (senderTab) {
    if (this.browser !== undefined && this.browser.browserSettings != undefined) {
      // Respect Firefox browserSettings if we have them. (`browser` is undefined in Chrome).
      // See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserSettings
      return browser.browserSettings.newTabPosition.get({}).then(function(newTabPosition) {
        if (newTabPosition.value === "afterCurrent") {
          return Promise.resolve(tabPositions.afterCurrent(senderTab));
        } else if (newTabPosition.value === "relatedAfterCurrent") {
          return Promise.resolve(tabPositions.relatedAfterCurrent(senderTab, tabs));
        } else if (newTabPosition.value === "atEnd") {
          return Promise.resolve(tabPositions.atEnd());
        } else {
          return Promise.resolve(undefined);
        }
      });
    } else {
      return Promise.resolve(tabPositions.relatedAfterCurrent(senderTab, tabs));
    }
  } else {
    return Promise.resolve(undefined);
  }
};

chrome.runtime.getPlatformInfo(function(info) {
  const isMac = info.os === "mac";

  chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message.shiftKey) {
      chrome.windows.create({
        url: message.url
      });
    } else {
      // ctrl+click opens a context menu on Mac, so don't create the new tab.
      const shouldOpenTab = !(isMac && message.ctrlKey);

      if (shouldOpenTab) {
        chrome.tabs.query({
          windowId: sender.tab.windowId
        }, function(tabs) {
          calculateNewTabIndex(sender.tab, tabs).then(function(newTabIndex) {
            chrome.tabs.create({
              url: message.url,
              active: false, // TODO https://github.com/danielnixon/link-fixer/issues/2
              openerTabId: sender.tab.id,
              index: newTabIndex
            });
          });
        });
      }
    }
  });
});