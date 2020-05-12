/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import areEqualValue from '@tsdotnet/compare/dist/areEqual';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ArgumentException from '@tsdotnet/exceptions/dist/ArgumentException';
import type from '@tsdotnet/compare/dist/type';
import { compare } from '@tsdotnet/compare';
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
export function areAllEqual(arrays, strict = true, equalityComparison = areEqualValue) {
    if (!arrays)
        throw new ArgumentNullException('arrays');
    if (arrays.length < 2)
        throw new ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');
    if (type.isFunction(strict)) {
        equalityComparison = strict;
        strict = true;
    }
    const first = arrays[0];
    for (let i = 1, l = arrays.length; i < l; i++) {
        if (!areEqual(first, arrays[i], strict, equalityComparison))
            return false;
    }
    return true;
}
export function areEqual(a, b, strict = true, equalityComparison = areEqualValue) {
    const len = validateSize(a, b);
    if (type.isBoolean(len))
        return len;
    if (type.isFunction(strict)) {
        equalityComparison = strict;
        strict = true;
    }
    for (let i = 0; i < len; i++) {
        if (!equalityComparison(a[i], b[i], strict))
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
export function areEquivalent(a, b, comparison = compare) {
    const len = validateSize(a, b);
    if (type.isBoolean(len))
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