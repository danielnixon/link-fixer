const dropWhile = (f, xs) => xs.length ? dropWhileNotEmpty(f, xs) : [];
const dropWhileNotEmpty = (f, [x, ...xs]) =>  f(x) ? dropWhile(f, xs) : [x, ...xs];
const takeWhile = (f, xs) => xs.length ? takeWhileNotEmpty(f, xs) : [];
const takeWhileNotEmpty = (f, [x, ...xs]) =>  f(x) ? [x, ...takeWhile(f, xs)] : [];
const last = (xs) => xs.slice(-1)[0];

const calculateNewTabIndex = function(senderTab, tabs) {
  if (senderTab) {
    var tabsAfterSenderTab = dropWhile(tab => tab.index <= senderTab.index, tabs);
    var tabsOpenedBySenderTab = takeWhile(tab => tab.openerTabId === senderTab.id, tabsAfterSenderTab);
    var lastTabOpenedBySenderTab = last(tabsOpenedBySenderTab);
    return lastTabOpenedBySenderTab ? lastTabOpenedBySenderTab.index + 1 : undefined;
  } else {
    return undefined;
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
          windowId: sender.tab. windowId
        }, function(tabs) {
          chrome.tabs.create({
            url: message.url,
            active: false,
            openerTabId: sender.tab.id,
            index: calculateNewTabIndex(sender.tab, tabs)
          });
        })
      }
    }
  });
});