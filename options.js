/**
 * @param {Event} e
 */
function saveOptions(e) {
  chrome.storage.sync.set({
    // @ts-ignore
    tabPosition: document.querySelector("input[name='tab-position']:checked").value
  });
  e.preventDefault();
}

function restoreOptions() {
  chrome.storage.sync.get(items => {
    // @ts-ignore
    document.querySelector("input[name='tab-position'][value='background']").checked = items.tabPosition === 'background';
    // @ts-ignore
    document.querySelector("input[name='tab-position'][value='foreground']").checked = items.tabPosition === 'foreground';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
// @ts-ignore
document.querySelector("form").addEventListener("submit", saveOptions);