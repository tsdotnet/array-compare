import { describe, it, expect } from 'vitest';
import { areAllEqual, areEqual, areEquivalent } from '../src/arrayCompare.js';

describe('array-compare', () => {
	describe('areEqual', () => {
		it('should return true for identical arrays', () => {
			expect(areEqual([1, 2, 3], [1, 2, 3])).toBe(true);
		});

		it('should return false for different arrays', () => {
			expect(areEqual([1, 2, 3], [1, 2, 4])).toBe(false);
		});

		it('should return false for arrays of different lengths', () => {
			expect(areEqual([1, 2], [1, 2, 3])).toBe(false);
		});

		it('should handle same object reference', () => {
			const arr = [1, 2, 3];
			expect(areEqual(arr, arr)).toBe(true);
		});

		it('should handle both null/undefined arrays', () => {
			expect(areEqual(null as any, null as any)).toBe(true);
			expect(areEqual(undefined as any, undefined as any)).toBe(true);
		});

		it('should handle one null/undefined array', () => {
			expect(areEqual([1, 2], null as any)).toBe(false);
			expect(areEqual(null as any, [1, 2])).toBe(false);
			expect(areEqual([1, 2], undefined as any)).toBe(false);
		});

		it('should handle empty arrays', () => {
			expect(areEqual([], [])).toBe(true);
		});

		it('should handle arrays with undefined elements', () => {
			const sparseArray1 = new Array(3);
			sparseArray1[0] = 1;
			sparseArray1[2] = 3;
			// sparseArray1[1] is undefined
			
			const sparseArray2 = new Array(3);
			sparseArray2[0] = 1;
			sparseArray2[2] = 3;
			// sparseArray2[1] is undefined
			
			expect(areEqual(sparseArray1, sparseArray2)).toBe(true);

			const sparseArray3 = new Array(3);
			sparseArray3[0] = 1;
			sparseArray3[1] = 2;
			sparseArray3[2] = 3;
			
			expect(areEqual(sparseArray1, sparseArray3)).toBe(false);
		});

		it('should use custom equality comparison', () => {
			const customEqual = (a: number, b: number) => Math.abs(a - b) <= 1;
			expect(areEqual([1, 2, 3], [2, 3, 4], customEqual)).toBe(true);
			expect(areEqual([1, 2, 3], [1, 2, 5], customEqual)).toBe(false);
		});
	});

	describe('areAllEqual', () => {
		it('should return true for identical arrays', () => {
			expect(areAllEqual([[1, 2], [1, 2], [1, 2]])).toBe(true);
		});

		it('should return false for different arrays', () => {
			expect(areAllEqual([[1, 2], [1, 3], [1, 2]])).toBe(false);
		});

		it('should throw for null arrays parameter', () => {
			expect(() => areAllEqual(null as any)).toThrow('arrays');
		});

		it('should throw for arrays with less than 2 elements', () => {
			expect(() => areAllEqual([])).toThrow('Cannot compare a set of arrays less than 2.');
			expect(() => areAllEqual([[1, 2]])).toThrow('Cannot compare a set of arrays less than 2.');
		});

		it('should return false for undefined arrays', () => {
			expect(areAllEqual([undefined as any, [1, 2]])).toBe(false);
			expect(areAllEqual([[1, 2], undefined as any])).toBe(false);
		});

		it('should use custom equality comparison', () => {
			const customEqual = (a: number, b: number) => Math.abs(a - b) <= 1;
			expect(areAllEqual([[1, 2], [2, 3], [1, 2]], customEqual)).toBe(true);
		});
	});

	describe('areEquivalent', () => {
		it('should return true for arrays with same elements in different order', () => {
			expect(areEquivalent([1, 2, 3], [3, 1, 2])).toBe(true);
		});

		it('should return false for arrays with different elements', () => {
			expect(areEquivalent([1, 2, 3], [1, 2, 4])).toBe(false);
		});

		it('should handle same object reference', () => {
			const arr = [3, 1, 2];
			expect(areEquivalent(arr, arr)).toBe(true);
		});

		it('should handle both null/undefined arrays', () => {
			expect(areEquivalent(null as any, null as any)).toBe(true);
			expect(areEquivalent(undefined as any, undefined as any)).toBe(true);
		});

		it('should handle one null/undefined array', () => {
			expect(areEquivalent([1, 2], null as any)).toBe(false);
			expect(areEquivalent(null as any, [1, 2])).toBe(false);
		});

		it('should handle empty arrays', () => {
			expect(areEquivalent([], [])).toBe(true);
		});

		it('should handle single element arrays', () => {
			expect(areEquivalent([1], [1])).toBe(true);
			expect(areEquivalent([1], [2])).toBe(false);
		});

		it('should use custom comparison function', () => {
			const reverseCompare = (a: number, b: number) => b - a;
			expect(areEquivalent([1, 2, 3], [3, 2, 1], reverseCompare)).toBe(true);
		});

		it('should handle large arrays efficiently', () => {
			const largeArray1 = Array.from({ length: 70000 }, (_, i) => i);
			const largeArray2 = Array.from({ length: 70000 }, (_, i) => 69999 - i);
			expect(areEquivalent(largeArray1, largeArray2)).toBe(true);
		});

		it('should throw for arrays with undefined elements in sorting', () => {
			const sparseArray1 = new Array(3);
			sparseArray1[0] = 1;
			// sparseArray1[1] is undefined
			sparseArray1[2] = 3;

			const sparseArray2 = new Array(3);
			sparseArray2[0] = 1;
			sparseArray2[1] = 2;
			sparseArray2[2] = 3;

			// Both cases should throw because internalSort checks for undefined
			expect(() => areEquivalent(sparseArray1, sparseArray2)).toThrow('Array element at index 1 is undefined');
			expect(() => areEquivalent(sparseArray2, sparseArray1)).toThrow('Array element at index 1 is undefined');
			
			// Test with different undefined positions
			const sparseArray3 = new Array(2);
			sparseArray3[0] = 1;
			// sparseArray3[1] is undefined

			const sparseArray4 = new Array(2);
			// sparseArray4[0] is undefined
			sparseArray4[1] = 2;

			expect(() => areEquivalent(sparseArray3, sparseArray4)).toThrow('Array element at index');
			expect(() => areEquivalent(sparseArray4, sparseArray3)).toThrow('Array element at index');
		});
	});
});