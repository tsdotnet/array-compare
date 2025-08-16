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
/*  validateSize: Utility for quick validation/invalidation of array equality.
    Why this way?  Why not pass a closure for the last return?
    Reason: Performance and avoiding the creation of new functions/closures. */
function validateSize(a, b) {
    // Both valid and are same object, or both are null/undefined.
    if ((a && b && a === b) || (!a && !b))
        return true;
    // At this point, at least one has to be non-null.
    if (!a || !b)
        return false;
    const len = a.length;
    if (len !== b.length)
        return false;
    // If both are arrays and have zero length, they are equal.
    if (len === 0)
        return true;
    // Return the length for downstream processing.
    return len;
}
function areAllEqual(arrays, equalityComparison = compare_1.areEqual) {
    if (!arrays)
        throw new exceptions_1.ArgumentNullException('arrays');
    if (arrays.length < 2)
        throw new exceptions_1.ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');
    const first = arrays[0];
    for (let i = 1, l = arrays.length; i < l; i++) {
        if (!areEqual(first, arrays[i], equalityComparison))
            return false;
    }
    return true;
}
/**
 * Compares two arrays for equality.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @param {EqualityComparison<T>} equalityComparison
 * @returns {boolean} True if both arrays have the same contents.
 */
function areEqual(a, b, equalityComparison = compare_1.areEqual) {
    const len = validateSize(a, b);
    if (type_1.default.isBoolean(len))
        return len;
    for (let i = 0; i < len; i++) {
        if (!equalityComparison(a[i], b[i]))
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
        b[i] = a[i];
    }
    b.sort(comparison);
    return b;
}
/**
 * Returns true if both arrays contain the same contents regardless of order.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @param {Comparison} comparison
 * @returns {boolean}
 */
function areEquivalent(a, b, comparison = compare_2.compare) {
    const len = validateSize(a, b);
    if (type_1.default.isBoolean(len))
        return len;
    // There might be a better performing way to do this, but for the moment, this
    // works quite well.
    a = internalSort(a, comparison);
    b = internalSort(b, comparison);
    for (let i = 0; i < len; i++) {
        if (comparison(a[i], b[i]) !== 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=arrayCompare.js.map