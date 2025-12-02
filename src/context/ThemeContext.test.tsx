import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// Mock useLocalStorage
const mockSetStoredValue = vi.fn();
vi.mock('../hooks/useLocalStorage', () => ({
    useLocalStorage: (_key: string, initialValue: any) => {
        return [initialValue, mockSetStoredValue];
    },
}));

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

const TestComponent = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button onClick={() => setTheme('dark')}>Set Dark</button>
            <button onClick={() => setTheme('light')}>Set Light</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.documentElement.className = '';
    });

    it('should provide default theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value').textContent).toBe('system');
    });

    it('should update theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        act(() => {
            screen.getByText('Set Dark').click();
        });

        expect(mockSetStoredValue).toHaveBeenCalledWith('dark');
    });

    it('should apply theme class to document element', () => {
        // Mock useLocalStorage to return 'dark'
        vi.mocked(mockSetStoredValue).mockImplementationOnce(() => { });

        // We need to re-mock the hook implementation for this specific test if we want to test the effect
        // But since we mocked the hook to return initialValue, we can pass defaultTheme='dark'

        render(
            <ThemeProvider defaultTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
