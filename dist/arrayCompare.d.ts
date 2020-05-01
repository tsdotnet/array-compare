/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { Comparable, Comparison, EqualityComparison } from '@tsdotnet/compare';
declare type Primitive = string | number | boolean;
export declare function areAllEqual(arrays: ArrayLike<ArrayLike<any>>, equalityComparer?: EqualityComparison<any>): boolean;
export declare function areAllEqual(arrays: ArrayLike<ArrayLike<any>>, strict: boolean, equalityComparer?: EqualityComparison<any>): boolean;
/**
 * Compares two arrays for equality.
 * @param a
 * @param b
 * @param equalityComparer
 */
export declare function areEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>, equalityComparer?: EqualityComparison<T>): boolean;
export declare function areEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>, strict: boolean, equalityComparer?: EqualityComparison<T>): boolean;
export declare function areEquivalent<T extends Primitive>(a: ArrayLike<T>, b: ArrayLike<T>): boolean;
export declare function areEquivalent<T>(a: ArrayLike<Comparable<T>>, b: ArrayLike<Comparable<T>>): boolean;
export declare function areEquivalent<T>(a: ArrayLike<T>, b: ArrayLike<T>, comparer: Comparison<T>): boolean;
export {};
