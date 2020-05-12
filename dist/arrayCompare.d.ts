/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { ComparableObject, Comparison, EqualityComparison } from '@tsdotnet/compare/dist/Comparable';
declare type Primitive = string | number | boolean;
export declare function areAllEqual(arrays: ArrayLike<ArrayLike<any>>, equalityComparison?: EqualityComparison<any>): boolean;
export declare function areAllEqual(arrays: ArrayLike<ArrayLike<any>>, strict: boolean, equalityComparison?: EqualityComparison<any>): boolean;
/**
 * Compares two arrays for equality.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @param {EqualityComparison<T>} equalityComparison
 * @returns {boolean} True if both arrays have the same contents.
 */
export declare function areEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>, equalityComparison?: EqualityComparison<T>): boolean;
export declare function areEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>, strict: boolean, equalityComparison?: EqualityComparison<T>): boolean;
/**
 * Returns true if both arrays contain the same contents regardless of order.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @returns {boolean}
 */
export declare function areEquivalent<T extends Primitive>(a: ArrayLike<T>, b: ArrayLike<T>): boolean;
export declare function areEquivalent<T>(a: ArrayLike<ComparableObject<T>>, b: ArrayLike<ComparableObject<T>>): boolean;
export declare function areEquivalent<T>(a: ArrayLike<T>, b: ArrayLike<T>, comparison: Comparison<T>): boolean;
export {};
