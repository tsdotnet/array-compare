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
	});

	describe('areAllEqual', () => {
		it('should return true for identical arrays', () => {
			expect(areAllEqual([[1, 2], [1, 2], [1, 2]])).toBe(true);
		});

		it('should return false for different arrays', () => {
			expect(areAllEqual([[1, 2], [1, 3], [1, 2]])).toBe(false);
		});
	});

	describe('areEquivalent', () => {
		it('should return true for arrays with same elements in different order', () => {
			expect(areEquivalent([1, 2, 3], [3, 1, 2])).toBe(true);
		});

		it('should return false for arrays with different elements', () => {
			expect(areEquivalent([1, 2, 3], [1, 2, 4])).toBe(false);
		});
	});
});