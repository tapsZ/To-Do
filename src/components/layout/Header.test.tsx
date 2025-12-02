import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../components/layout/Header';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('Header Theme Toggle', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';
    });

    it('should toggle theme class on html element', () => {
        render(
            <ThemeProvider defaultTheme="light">
                <Header />
            </ThemeProvider>
        );

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Initial state: light
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        // Click to toggle to dark
        fireEvent.click(button);
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // Click to toggle to light
        fireEvent.click(button);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
});
