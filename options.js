/**
 * @param {Event} e
 */
function saveOptions(e) {
  const checkedTabPositionInput = document.querySelector(
    "input[name='tab-position']:checked"
  );
  const tabPosition =
    checkedTabPositionInput instanceof HTMLInputElement
      ? checkedTabPositionInput.value
      : undefined;
  chrome.storage.sync.set({ tabPosition: tabPosition });
  e.preventDefault();
}

function restoreOptions() {
  chrome.storage.sync.get((items) => {
    const backgroundInput = document.querySelector(
      "input[name='tab-position'][value='background']"
    );
    if (backgroundInput instanceof HTMLInputElement) {
      backgroundInput.checked = items.tabPosition === "background";
    }
    const foregroundInput = document.querySelector(
      "input[name='tab-position'][value='foreground']"
    );
    if (foregroundInput instanceof HTMLInputElement) {
      foregroundInput.checked = items.tabPosition === "foreground";
    }
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);

const form = document.querySelector("form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", saveOptions);
}
