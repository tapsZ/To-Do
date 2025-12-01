import React, { createContext, useContext, useReducer, useEffect } from "react"
import type { Todo } from "../services/todoService"
import { useTodoOperations } from "../hooks/useTodoOperations"

type TodoState = {
    todos: Todo[]
    isLoading: boolean
    error: string | null
    filter: "all" | "active" | "completed"
}

type TodoAction =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: Todo[] }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "UPDATE_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "SET_FILTER"; payload: "all" | "active" | "completed" }

export const initialState: TodoState = {
    todos: [],
    isLoading: false,
    error: null,
    filter: "all",
}

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, isLoading: true, error: null }
        case "FETCH_SUCCESS":
            return { ...state, isLoading: false, todos: action.payload }
        case "FETCH_ERROR":
            return { ...state, isLoading: false, error: action.payload }
        case "ADD_TODO":
            return { ...state, todos: [action.payload, ...state.todos] }
        case "UPDATE_TODO":
            return {
                ...state,
                todos: state.todos.map((t) => (t.id === action.payload.id ? action.payload : t)),
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((t) => t.id !== action.payload),
            }
        case "SET_FILTER":
            return { ...state, filter: action.payload }
        default:
            return state
    }
}

interface TodoContextType extends TodoState {
    addTodo: (text: string) => Promise<void>
    toggleComplete: (id: string) => Promise<void>
    deleteTodo: (id: string) => Promise<void>
    updateTodoText: (id: string, text: string) => Promise<void>
    setFilter: (filter: "all" | "active" | "completed") => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const {
        loadTodos,
        addTodo,
        toggleComplete,
        updateTodoText,
        deleteTodo,
    } = useTodoOperations(dispatch, state.todos)

    useEffect(() => {
        loadTodos()
    }, [loadTodos])

    const setFilter = (filter: "all" | "active" | "completed") => {
        dispatch({ type: "SET_FILTER", payload: filter })
    }

    const value = {
        ...state,
        addTodo,
        toggleComplete,
        deleteTodo,
        updateTodoText,
        setFilter,
    }

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodos = () => {
    const context = useContext(TodoContext)
    if (context === undefined) {
        throw new Error("useTodos must be used within a TodoProvider")
    }
    return context
}
