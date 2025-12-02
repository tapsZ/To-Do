import { describe, it, expect } from 'vitest';
import { todoReducer, initialState } from './TodoContext';

describe('todoReducer', () => {
    it('should handle FETCH_START', () => {
        const action = { type: 'FETCH_START' } as const;
        const state = todoReducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('should handle FETCH_SUCCESS', () => {
        const todos = [{ id: '1', text: 'Test Todo', completed: false, createdAt: new Date() }];
        const action = { type: 'FETCH_SUCCESS', payload: todos } as const;
        const state = todoReducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.todos).toEqual(todos);
    });

    it('should handle FETCH_ERROR', () => {
        const error = 'Error fetching todos';
        const action = { type: 'FETCH_ERROR', payload: error } as const;
        const state = todoReducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
    });

    it('should handle ADD_TODO', () => {
        const newTodo = { id: '1', text: 'New Todo', completed: false, createdAt: new Date() };
        const action = { type: 'ADD_TODO', payload: newTodo } as const;
        const state = todoReducer(initialState, action);
        expect(state.todos).toContainEqual(newTodo);
    });

    it('should handle UPDATE_TODO', () => {
        const initialTodos = [{ id: '1', text: 'Old Todo', completed: false, createdAt: new Date() }];
        const updatedTodo = { id: '1', text: 'Updated Todo', completed: true, createdAt: new Date() };
        const stateWithTodos = { ...initialState, todos: initialTodos };
        const action = { type: 'UPDATE_TODO', payload: updatedTodo } as const;
        const state = todoReducer(stateWithTodos, action);
        expect(state.todos[0]).toEqual(updatedTodo);
    });

    it('should handle DELETE_TODO', () => {
        const initialTodos = [{ id: '1', text: 'Todo to delete', completed: false, createdAt: new Date() }];
        const stateWithTodos = { ...initialState, todos: initialTodos };
        const action = { type: 'DELETE_TODO', payload: '1' } as const;
        const state = todoReducer(stateWithTodos, action);
        expect(state.todos).toHaveLength(0);
    });

    it('should handle SET_FILTER', () => {
        const action = { type: 'SET_FILTER', payload: 'active' } as const;
        const state = todoReducer(initialState, action);
        expect(state.filter).toBe('active');
    });
});
