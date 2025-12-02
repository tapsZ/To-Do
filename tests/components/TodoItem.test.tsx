import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../../src/features/todos/components/TodoItem';
import { useTodos } from '../../src/context/todo/TodoContext';

// Mock useTodos
vi.mock('../../src/context/todo/TodoContext', () => ({
    useTodos: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock UI components
vi.mock('../../src/components/ui/Checkbox', () => ({
    Checkbox: ({ checked, onCheckedChange }: any) => (
        <input type="checkbox" checked={checked} onChange={() => onCheckedChange(!checked)} data-testid="checkbox" />
    ),
}));
vi.mock('../../src/components/ui/Button', () => ({
    Button: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
}));
vi.mock('../../src/components/ui/Input', () => ({
    Input: ({ value, onChange, onKeyDown, ...props }: any) => (
        <input value={value} onChange={onChange} onKeyDown={onKeyDown} {...props} />
    ),
}));
vi.mock('../../src/components/ui/Modal', () => ({
    Modal: ({ isOpen, children, footer, title }: any) => isOpen ? (
        <div data-testid="modal">
            <h1>{title}</h1>
            {children}
            {footer}
        </div>
    ) : null,
}));

describe('TodoItem', () => {
    const mockTodo = {
        id: '1',
        text: 'Test Todo',
        completed: false,
        createdAt: Date.now(),
    };

    const mockToggleComplete = vi.fn();
    const mockDeleteTodo = vi.fn();
    const mockUpdateTodoText = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useTodos).mockReturnValue({
            toggleComplete: mockToggleComplete,
            deleteTodo: mockDeleteTodo,
            updateTodoText: mockUpdateTodoText,
        } as any);
    });

    it('should render todo text', () => {
        render(<TodoItem todo={mockTodo} />);
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    it('should toggle completion status', () => {
        render(<TodoItem todo={mockTodo} />);
        fireEvent.click(screen.getByTestId('checkbox'));
        expect(mockToggleComplete).toHaveBeenCalledWith('1');
    });

    it('should enter edit mode on double click', () => {
        render(<TodoItem todo={mockTodo} />);
        fireEvent.doubleClick(screen.getByText('Test Todo'));
        expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    });

    it('should update todo text', () => {
        render(<TodoItem todo={mockTodo} />);
        fireEvent.doubleClick(screen.getByText('Test Todo'));
        const input = screen.getByDisplayValue('Test Todo');
        fireEvent.change(input, { target: { value: 'Updated Todo' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(mockUpdateTodoText).toHaveBeenCalledWith('1', 'Updated Todo');
    });

    it('should open delete modal', () => {
        render(<TodoItem todo={mockTodo} />);

        const buttons = screen.getAllByRole('button');
        // 0: Edit, 1: Delete
        fireEvent.click(buttons[1]);

        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByText('Delete Task')).toBeInTheDocument();
    });

    it('should delete todo', async () => {
        render(<TodoItem todo={mockTodo} />);
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]); // Open modal

        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        expect(mockDeleteTodo).toHaveBeenCalledWith('1');
    });
});
