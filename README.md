[![Firefox users](https://img.shields.io/amo/users/link-fixer.svg?label=Firefox%20users)](https://addons.mozilla.org/en-US/firefox/addon/link-fixer/statistics/)
[![Firefox downloads](https://img.shields.io/amo/dw/link-fixer.svg?label=Firefox%20downloads)](https://addons.mozilla.org/en-US/firefox/addon/link-fixer/statistics/)
[![Firefox rating](https://img.shields.io/amo/rating/link-fixer.svg?label=Firefox%20rating)](https://addons.mozilla.org/en-US/firefox/addon/link-fixer/reviews/)
[![Chrome users](https://img.shields.io/chrome-web-store/users/mfgoieafikaldiglpkfgifoeigjcifmk.svg?label=Chrome%20users)](https://chrome.google.com/webstore/detail/link-fixer/mfgoieafikaldiglpkfgifoeigjcifmk)

[![Build Status](https://github.com/danielnixon/link-fixer/actions/workflows/node.js.yml/badge.svg)](https://github.com/danielnixon/link-fixer/actions/workflows/node.js.yml)
[![Type Coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdanielnixon%2Flink-fixer%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/danielnixon/link-fixer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/danielnixon/link-fixer?targetFile=package.json)

# Link Fixer

The default behaviour of ctrl+click, shift+click, cmd+click (on macOS) and middle-click when clicking on links is to open the link in a new tab (or new window in the case of shift).

This behaviour is sometimes [broken by careless developers](https://superuser.com/questions/854797/why-does-ctrl-click-not-open-some-links-in-a-new-tab/).

This add-on restores the default behaviour, ensuring the modifier keys always cause links to open in a new tab (or window).

# Installation

* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/link-fixer/)
* [Chrome](https://chrome.google.com/webstore/detail/link-fixer/mfgoieafikaldiglpkfgifoeigjcifmk)

# A note on the plain JS

Mozilla's [add-on submission process requires submission of source code](https://extensionworkshop.com/documentation/publish/source-code-submission/). It's probably an overly strict interpretation of that requirement, but I took it to mean that something like TypeScript (that neverless produces mostly readable, unobfuscated output) would require source code upload and push an add-on into the slow approval lane.

You'll notice this repo doesn't have a *.ts file in sight, and yet achieves [a very high type coverage score](https://github.com/danielnixon/link-fixer/blob/master/package.json#L29-L33) courtesy of [JSDoc types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#type).

I took this as an opportunity to see how far I could push this given the no *.ts constraint.
