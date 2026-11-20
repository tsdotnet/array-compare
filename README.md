<a href="https://tsdotnet.github.io/array-compare/"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/array-compare@master/assets/banner.svg" alt="@tsdotnet/array-compare: Compare arrays by value. Equal, or equivalent in any order."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/array-compare.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/array-compare)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/array-compare/blob/master/LICENSE)

Compare two arrays element by element, for equality or for equivalence in any order.

## Install

```sh
npm install @tsdotnet/array-compare
```

## Usage

```ts
import { areEqual, areEquivalent } from '@tsdotnet/array-compare';

areEqual([1, 2, 3], [1, 2, 3]);       // true
areEqual([1, 2, 3], [3, 2, 1]);       // false: order matters
areEquivalent([1, 2, 3], [3, 2, 1]);  // true: same items, any order
```

Both take an optional comparison for your own item type. `areAllEqual` checks a whole set of arrays against the first.

## Use it from

ESM (`import { areEqual, areEquivalent } from '@tsdotnet/array-compare';`) or CommonJS (`const { areEqual, areEquivalent } = require('@tsdotnet/array-compare');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-compare@1/dist/umd/array-compare.min.js"></script>
<script>
  const { areEqual, areEquivalent } = tsdotnet.arrayCompare;
</script>
```

</details>

## Docs

[tsdotnet.github.io/array-compare](https://tsdotnet.github.io/array-compare/)
