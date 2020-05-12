/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import areEqualValue from '@tsdotnet/compare/dist/areEqual';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ArgumentException from '@tsdotnet/exceptions/dist/ArgumentException';
import {ComparableObject, Comparison, EqualityComparison} from '@tsdotnet/compare/dist/Comparable';
import type from '@tsdotnet/compare/dist/type';
import {compare} from '@tsdotnet/compare';

type Primitive = string | number | boolean;

/*  validateSize: Utility for quick validation/invalidation of array equality.
	Why this way?  Why not pass a closure for the last return?
	Reason: Performance and avoiding the creation of new functions/closures. */
function validateSize (a: ArrayLike<any>, b: ArrayLike<any>): boolean | number
{
	// Both valid and are same object, or both are null/undefined.
	if((a && b && a===b) || (!a && !b)) return true;

	// At this point, at least one has to be non-null.
	if(!a || !b) return false;

	const len = a.length;
	if(len!==b.length) return false;

	// If both are arrays and have zero length, they are equal.
	if(len===0) return true;

	// Return the length for downstream processing.
	return len;
}

export function areAllEqual (
	arrays: ArrayLike<ArrayLike<any>>,
	equalityComparison?: EqualityComparison<any>): boolean;
export function areAllEqual (
	arrays: ArrayLike<ArrayLike<any>>,
	strict: boolean,
	equalityComparison?: EqualityComparison<any>
): boolean;
export function areAllEqual (
	arrays: ArrayLike<ArrayLike<any>>,
	strict: boolean | EqualityComparison<any>   = true,
	equalityComparison: EqualityComparison<any> = areEqualValue
): boolean
{
	if(!arrays) throw new ArgumentNullException('arrays');
	if(arrays.length<2) throw new ArgumentException('arrays', 'Cannot compare a set of arrays less than 2.');

	if(type.isFunction(strict))
	{
		equalityComparison = strict;
		strict = true;
	}

	const first = arrays[0];
	for(let i = 1, l = arrays.length; i<l; i++)
	{
		if(!areEqual(first, arrays[i], strict, equalityComparison)) return false;
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
export function areEqual<T> (
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	equalityComparison?: EqualityComparison<T>): boolean;
export function areEqual<T> (
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	strict: boolean,
	equalityComparison?: EqualityComparison<T>
): boolean;
export function areEqual<T> (
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	strict: boolean | EqualityComparison<T>   = true,
	equalityComparison: EqualityComparison<T> = areEqualValue
): boolean
{
	const len = validateSize(a, b);
	if(type.isBoolean(len)) return len as boolean;

	if(type.isFunction(strict))
	{
		equalityComparison = strict;
		strict = true;
	}

	for(let i = 0; i<len; i++)
	{
		if(!equalityComparison(a[i], b[i], strict)) return false;
	}

	return true;
}

function internalSort<T> (a: ArrayLike<T>, comparison: Comparison<T>): ArrayLike<T>
{
	if(!a || a.length<2) return a;

	const len = a.length;
	let b: T[];
	if(len>65536) b = new Array(len);
	else
	{
		b = [];
		b.length = len;
	}
	for(let i = 0; i<len; i++)
	{
		b[i] = a[i];
	}

	b.sort(comparison);
	return b;
}

/**
 * Returns true if both arrays contain the same contents regardless of order.
 * @param {ArrayLike<T>} a
 * @param {ArrayLike<T>} b
 * @returns {boolean}
 */
export function areEquivalent<T extends Primitive> (a: ArrayLike<T>, b: ArrayLike<T>): boolean;
export function areEquivalent<T> (
	a: ArrayLike<ComparableObject<T>>,
	b: ArrayLike<ComparableObject<T>>): boolean;
export function areEquivalent<T> (
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	comparison: Comparison<T>): boolean;
export function areEquivalent<T> (
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	comparison: Comparison<T> = compare): boolean
{
	const len = validateSize(a, b);
	if(type.isBoolean(len)) return len as boolean;

	// There might be a better performing way to do this, but for the moment, this
	// works quite well.
	a = internalSort(a, comparison);
	b = internalSort(b, comparison);

	for(let i = 0; i<len; i++)
	{
		if(comparison(a[i], b[i])!==0) return false;
	}

	return true;
}
