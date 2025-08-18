/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import type { Comparison, EqualityComparison } from '@tsdotnet/compare';
export declare function areAllEqual(arrays: ArrayLike<ArrayLike<any>>, equalityComparison?: EqualityComparison<any>): boolean;
export declare function areEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>, equalityComparison?: EqualityComparison<T>): boolean;
export declare function areEquivalent<T>(a: ArrayLike<T>, b: ArrayLike<T>, comparison?: Comparison<T>): boolean;
