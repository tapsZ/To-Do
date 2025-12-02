import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodos } from '../../../context/TodoContext';

// Mock useTodos
vi.mock('../../../context/TodoContext', () => ({
    useTodos: vi.fn(),
}));

// Mock TodoItem
vi.mock('./TodoItem', () => ({
    TodoItem: ({ todo }: any) => <div data-testid="todo-item">{todo.text}</div>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('TodoList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render loading state', () => {
        vi.mocked(useTodos).mockReturnValue({
            todos: [],
            filter: 'all',
            isLoading: true,
            error: null,
        } as any);

        render(<TodoList />);
        // Check for pulse elements
        const pulseElements = document.querySelectorAll('.animate-pulse');
        expect(pulseElements.length).toBe(3);
    });

    it('should render error state', () => {
        vi.mocked(useTodos).mockReturnValue({
            todos: [],
            filter: 'all',
            isLoading: false,
            error: 'Failed to load',
        } as any);

        render(<TodoList />);
        expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });

    it('should render empty state', () => {
        vi.mocked(useTodos).mockReturnValue({
            todos: [],
            filter: 'all',
            isLoading: false,
            error: null,
        } as any);

        render(<TodoList />);
        expect(screen.getByText('No todos found')).toBeInTheDocument();
    });

    it('should render todos', () => {
        const todos = [
            { id: '1', text: 'Todo 1', completed: false },
            { id: '2', text: 'Todo 2', completed: true },
        ];
        vi.mocked(useTodos).mockReturnValue({
            todos,
            filter: 'all',
            isLoading: false,
            error: null,
        } as any);

        render(<TodoList />);
        expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });

    it('should filter active todos', () => {
        const todos = [
            { id: '1', text: 'Todo 1', completed: false },
            { id: '2', text: 'Todo 2', completed: true },
        ];
        vi.mocked(useTodos).mockReturnValue({
            todos,
            filter: 'active',
            isLoading: false,
            error: null,
        } as any);

        render(<TodoList />);
        expect(screen.getAllByTestId('todo-item')).toHaveLength(1);
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
    });

    it('should filter completed todos', () => {
        const todos = [
            { id: '1', text: 'Todo 1', completed: false },
            { id: '2', text: 'Todo 2', completed: true },
        ];
        vi.mocked(useTodos).mockReturnValue({
            todos,
            filter: 'completed',
            isLoading: false,
            error: null,
        } as any);

        render(<TodoList />);
        expect(screen.getAllByTestId('todo-item')).toHaveLength(1);
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
        expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    });
});
