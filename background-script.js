const dropWhile = (f, xs) => xs.length ? dropWhileNotEmpty(f, xs) : [];
const dropWhileNotEmpty = (f, [x, ...xs]) => f(x) ? dropWhile(f, xs) : [x, ...xs];
const takeWhile = (f, xs) => xs.length ? takeWhileNotEmpty(f, xs) : [];
const takeWhileNotEmpty = (f, [x, ...xs]) => f(x) ? [x, ...takeWhile(f, xs)] : [];

// TODO https://github.com/danielnixon/link-fixer/issues/13
const defaultTabPosition = "relatedAfterCurrent";

const getOptions = () => new Promise(resolve => chrome.storage.sync.get(items => resolve(items)));

const tabPositions = {
  relatedAfterCurrent: (senderTab, tabs) => {
    const tabsAfterSenderTab = dropWhile(tab => tab.index <= senderTab.index, tabs);
    const tabsOpenedBySenderTab = takeWhile(tab => tab.openerTabId !== undefined && tab.openerTabId === senderTab.id, tabsAfterSenderTab);
    const lastTabOpenedBySenderTab = tabsOpenedBySenderTab.slice(-1)[0];
    return lastTabOpenedBySenderTab ? lastTabOpenedBySenderTab.index + 1 : undefined;
  },
  afterCurrent: senderTab => senderTab.index + 1,
  atEnd: () => Number.MAX_SAFE_INTEGER
};

// Respect Firefox browserSettings if we have them. (`browser` is undefined in Chrome,
// `newTabPosition` is undefined in older versions of Firefox).
// See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserSettings
const newTabPosition = this.browser && this.browser.browserSettings && this.browser.browserSettings.newTabPosition;
const getNewTabPosition = () => newTabPosition !== undefined
  ? newTabPosition.get({}).then(x => x.value)
  : Promise.resolve(defaultTabPosition);

const calculateNewTabIndex = (senderTab, tabs) => {
  if (senderTab) {
    return getNewTabPosition().then(newTabPosition => {
      switch (newTabPosition) {
      case "afterCurrent":
        return Promise.resolve(tabPositions.afterCurrent(senderTab));
      case "relatedAfterCurrent":
        return Promise.resolve(tabPositions.relatedAfterCurrent(senderTab, tabs));
      case "atEnd":
        return Promise.resolve(tabPositions.atEnd());
      default:
        return Promise.resolve(undefined);
      }
    });
  } else {
    return Promise.resolve(undefined);
  }
};

chrome.runtime.getPlatformInfo(info => {
  const isMac = info.os === "mac";

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.shiftKey) {
      chrome.windows.create({
        url: message.url
      });
    } else {
      // ctrl+click opens a context menu on Mac, so don't create the new tab.
      const shouldOpenTab = !(isMac && message.ctrlKey);

      if (shouldOpenTab) {
        chrome.tabs.query({
          windowId: sender.tab && sender.tab.windowId
        }, tabs => {
          calculateNewTabIndex(sender.tab, tabs).then(newTabIndex => {
            getOptions().then(options => {
              chrome.tabs.create({
                url: message.url,
                active: options.tabPosition === "foreground",
                openerTabId: sender.tab && sender.tab.id,
                index: newTabIndex
              });
            });
          });
        });
      }
    }
  });
});
