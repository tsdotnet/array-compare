import { areEqual as areEqual$1, compare } from '@tsdotnet/compare';
import { ArgumentNullException, ArgumentException } from '@tsdotnet/exceptions';
import typeUtil from '@tsdotnet/type';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
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
function areAllEqual(arrays, equalityComparison = areEqual$1) {
    if (!arrays)
        throw new ArgumentNullException('arrays');
    if (arrays.length < 2)
        throw new ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');
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
function areEqual(a, b, equalityComparison = areEqual$1) {
    const len = validateSize(a, b);
    if (typeUtil.isBoolean(len))
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
function areEquivalent(a, b, comparison = compare) {
    const len = validateSize(a, b);
    if (typeUtil.isBoolean(len))
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

export { areAllEqual, areEqual, areEquivalent };
//# sourceMappingURL=arrayCompare.js.map
