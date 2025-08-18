"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.areAllEqual = areAllEqual;
exports.areEqual = areEqual;
exports.areEquivalent = areEquivalent;
const tslib_1 = require("tslib");
const compare_1 = require("@tsdotnet/compare");
const exceptions_1 = require("@tsdotnet/exceptions");
const type_1 = tslib_1.__importDefault(require("@tsdotnet/type"));
const compare_2 = require("@tsdotnet/compare");
function validateSize(a, b) {
    if ((a && b && a === b) || (!a && !b))
        return true;
    if (!a || !b)
        return false;
    const len = a.length;
    if (len !== b.length)
        return false;
    if (len === 0)
        return true;
    return len;
}
function areAllEqual(arrays, equalityComparison = compare_1.areEqual) {
    if (!arrays)
        throw new exceptions_1.ArgumentNullException('arrays');
    if (arrays.length < 2)
        throw new exceptions_1.ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');
    const first = arrays[0];
    if (first === undefined)
        return false;
    for (let i = 1, l = arrays.length; i < l; i++) {
        const current = arrays[i];
        if (current === undefined)
            return false;
        if (!areEqual(first, current, equalityComparison))
            return false;
    }
    return true;
}
function areEqual(a, b, equalityComparison = compare_1.areEqual) {
    const len = validateSize(a, b);
    if (type_1.default.isBoolean(len))
        return len;
    for (let i = 0; i < len; i++) {
        const aVal = a[i];
        const bVal = b[i];
        if (aVal === undefined || bVal === undefined) {
            return aVal === bVal;
        }
        if (!equalityComparison(aVal, bVal))
            return false;
    }
    return true;
}
function internalSort(a, comparison) {
    if (!a || a.length < 2)
        return a;
    const len = a.length;
    let b;
    if (len > 65536)
        b = new Array(len);
    else {
        b = [];
        b.length = len;
    }
    for (let i = 0; i < len; i++) {
        const val = a[i];
        if (val === undefined) {
            throw new Error(`Array element at index ${i} is undefined`);
        }
        b[i] = val;
    }
    b.sort(comparison);
    return b;
}
function areEquivalent(a, b, comparison = compare_2.compare) {
    const len = validateSize(a, b);
    if (type_1.default.isBoolean(len))
        return len;
    a = internalSort(a, comparison);
    b = internalSort(b, comparison);
    for (let i = 0; i < len; i++) {
        const aVal = a[i];
        const bVal = b[i];
        if (aVal === undefined || bVal === undefined) {
            throw new Error(`Array element at index ${i} is undefined`);
        }
        if (comparison(aVal, bVal) !== 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=arrayCompare.js.map