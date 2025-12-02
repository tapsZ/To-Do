import { describe, it, expect } from 'vitest';
import { cn } from '../../src/utils/cn';

describe('cn utility', () => {
    it('should merge class names correctly', () => {
        expect(cn('c1', 'c2')).toBe('c1 c2');
    });

    it('should handle conditional classes', () => {
        expect(cn('c1', true && 'c2', false && 'c3')).toBe('c1 c2');
    });

    it('should handle arrays of classes', () => {
        expect(cn(['c1', 'c2'])).toBe('c1 c2');
    });

    it('should handle objects with boolean values', () => {
        expect(cn({ c1: true, c2: false, c3: true })).toBe('c1 c3');
    });

    it('should merge tailwind classes correctly', () => {
        expect(cn('p-4 p-2')).toBe('p-2');
        expect(cn('text-red-500 text-blue-500')).toBe('text-blue-500');
    });

    it('should handle complex combinations', () => {
        expect(cn('c1', ['c2', { c3: true, c4: false }], 'p-4 p-2')).toBe('c1 c2 c3 p-2');
    });
});
