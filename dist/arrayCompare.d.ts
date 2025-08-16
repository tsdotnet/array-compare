/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { Comparison, EqualityComparison } from '@tsdotnet/compare';
export declare function areAllEqual(arrays: ArrayLike<ArrayLike<any>>, equalityComparison?: EqualityComparison<any>): boolean;
/**
 * Compares two arrays for equality.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @param {EqualityComparison<T>} equalityComparison
 * @returns {boolean} True if both arrays have the same contents.
 */
export declare function areEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>, equalityComparison?: EqualityComparison<T>): boolean;
/**
 * Returns true if both arrays contain the same contents regardless of order.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @param {Comparison} comparison
 * @returns {boolean}
 */
export declare function areEquivalent<T>(a: ArrayLike<T>, b: ArrayLike<T>, comparison?: Comparison<T>): boolean;
