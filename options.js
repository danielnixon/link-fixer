/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */

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
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  chrome.storage.sync.set({ tabPosition: tabPosition });
  e.preventDefault();
}

// eslint-disable-next-line functional/functional-parameters
function restoreOptions() {
  chrome.storage.sync.get((items) => {
    const backgroundInput = document.querySelector(
      "input[name='tab-position'][value='background']"
    );
    if (backgroundInput instanceof HTMLInputElement) {
      // eslint-disable-next-line functional/immutable-data
      backgroundInput.checked = items.tabPosition === "background";
    }
    const foregroundInput = document.querySelector(
      "input[name='tab-position'][value='foreground']"
    );
    if (foregroundInput instanceof HTMLInputElement) {
      // eslint-disable-next-line functional/immutable-data
      foregroundInput.checked = items.tabPosition === "foreground";
    }
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);

const form = document.querySelector("form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", saveOptions);
}
