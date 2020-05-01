/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { type, compare, areEqual as areEqualValue } from '@tsdotnet/compare';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ArgumentException from '@tsdotnet/exceptions/dist/ArgumentException';
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
export function areAllEqual(arrays, strict = true, equalityComparer = areEqualValue) {
    if (!arrays)
        throw new ArgumentNullException('arrays');
    if (arrays.length < 2)
        throw new ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');
    if (type.isFunction(strict)) {
        equalityComparer = strict;
        strict = true;
    }
    const first = arrays[0];
    for (let i = 1, l = arrays.length; i < l; i++) {
        if (!areEqual(first, arrays[i], strict, equalityComparer))
            return false;
    }
    return true;
}
export function areEqual(a, b, strict = true, equalityComparer = areEqualValue) {
    const len = validateSize(a, b);
    if (type.isBoolean(len))
        return len;
    if (type.isFunction(strict)) {
        equalityComparer = strict;
        strict = true;
    }
    for (let i = 0; i < len; i++) {
        if (!equalityComparer(a[i], b[i], strict))
            return false;
    }
    return true;
}
function internalSort(a, comparer) {
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
    b.sort(comparer);
    return b;
}
export function areEquivalent(a, b, comparer = compare) {
    const len = validateSize(a, b);
    if (type.isBoolean(len))
        return len;
    // There might be a better performing way to do this, but for the moment, this
    // works quite well.
    a = internalSort(a, comparer);
    b = internalSort(b, comparer);
    for (let i = 0; i < len; i++) {
        if (comparer(a[i], b[i]) !== 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=arrayCompare.js.map