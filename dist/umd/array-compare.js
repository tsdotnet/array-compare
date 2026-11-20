(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/compare'), require('@tsdotnet/exceptions'), require('@tsdotnet/type')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/compare', '@tsdotnet/exceptions', '@tsdotnet/type'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.arrayCompare = global.tsdotnet.arrayCompare || {}), global.tsdotnet.compare, global.tsdotnet.exceptions, global.tsdotnet.type));
})(this, (function (exports, compare, exceptions, typeUtil) { 'use strict';

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
    function areAllEqual(arrays, equalityComparison = compare.areEqual) {
        if (!arrays)
            throw new exceptions.ArgumentNullException('arrays');
        if (arrays.length < 2)
            throw new exceptions.ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');
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
    function areEqual(a, b, equalityComparison = compare.areEqual) {
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
    function areEquivalent(a, b, comparison = compare.compare) {
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

    exports.areAllEqual = areAllEqual;
    exports.areEqual = areEqual;
    exports.areEquivalent = areEquivalent;

}));
//# sourceMappingURL=array-compare.js.map
