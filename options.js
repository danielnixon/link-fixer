/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */

/** @typedef {{tabPosition: string | undefined}} Settings */

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
  /** @type {Settings} */
  const settings = { tabPosition: tabPosition };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  chrome.storage.sync.set(settings);
  e.preventDefault();
}

// eslint-disable-next-line functional/functional-parameters
function restoreOptions() {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  chrome.storage.sync.get((/** @type {Settings} */ settings) => {
    const backgroundInput = document.querySelector(
      "input[name='tab-position'][value='background']"
    );
    if (backgroundInput instanceof HTMLInputElement) {
      // eslint-disable-next-line functional/immutable-data
      backgroundInput.checked = settings.tabPosition === "background";
    }
    const foregroundInput = document.querySelector(
      "input[name='tab-position'][value='foreground']"
    );
    if (foregroundInput instanceof HTMLInputElement) {
      // eslint-disable-next-line functional/immutable-data
      foregroundInput.checked = settings.tabPosition === "foreground";
    }
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);

const form = document.querySelector("form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", saveOptions);
}
