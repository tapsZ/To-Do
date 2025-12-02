import React, { createContext, useContext, useReducer, useEffect } from "react"
import { todoService } from "../../services/todoService"
import type { TodoState } from "./types"
import { todoReducer, initialState } from "./reducer"

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

    useEffect(() => {
        const loadTodos = async () => {
            dispatch({ type: "FETCH_START" })
            try {
                const todos = await todoService.getTodos()
                dispatch({ type: "FETCH_SUCCESS", payload: todos })
            } catch (err) {
                dispatch({ type: "FETCH_ERROR", payload: "Failed to load todos" })
            }
        }
        loadTodos()
    }, [])

    const addTodo = async (text: string) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const newTodo = await todoService.addTodo(text)
            dispatch({ type: "ADD_TODO", payload: newTodo })
        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: "Failed to add todo" })
        }
    }

    const toggleComplete = async (id: string) => {
        const todo = state.todos.find((t) => t.id === id)
        if (!todo) return

        const updated = { ...todo, completed: !todo.completed }
        dispatch({ type: "UPDATE_TODO", payload: updated }) // Optimistic

        try {
            await todoService.updateTodo(updated)
        } catch (err) {
            dispatch({ type: "UPDATE_TODO", payload: todo }) // Revert
            dispatch({ type: "FETCH_ERROR", payload: "Failed to update todo" })
        }
    }

    const updateTodoText = async (id: string, text: string) => {
        const todo = state.todos.find((t) => t.id === id)
        if (!todo) return

        const updated = { ...todo, text }
        dispatch({ type: "UPDATE_TODO", payload: updated }) // Optimistic

        try {
            await todoService.updateTodo(updated)
        } catch (err) {
            dispatch({ type: "UPDATE_TODO", payload: todo }) // Revert
            dispatch({ type: "FETCH_ERROR", payload: "Failed to update todo" })
        }
    }

    const deleteTodo = async (id: string) => {
        try {
            await todoService.deleteTodo(id)
            dispatch({ type: "DELETE_TODO", payload: id })
        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: "Failed to delete todo" })
        }
    }

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
