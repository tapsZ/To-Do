import { useCallback } from "react"
import { todoService, type Todo } from "../services/todoService"

type TodoDispatch = (action: TodoAction) => void

type TodoAction =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: Todo[] }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "UPDATE_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: string }

export function useTodoOperations(dispatch: TodoDispatch, todos: Todo[]) {
    const loadTodos = useCallback(async () => {
        dispatch({ type: "FETCH_START" })
        try {
            const todos = await todoService.getTodos()
            dispatch({ type: "FETCH_SUCCESS", payload: todos })
        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: "Failed to load todos" })
        }
    }, [dispatch])

    const addTodo = useCallback(async (text: string) => {
        try {
            const newTodo = await todoService.addTodo(text)
            dispatch({ type: "ADD_TODO", payload: newTodo })
        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: "Failed to add todo" })
        }
    }, [dispatch])

    const toggleComplete = useCallback(async (id: string) => {
        const todo = todos.find((t) => t.id === id)
        if (!todo) return

        const updated = { ...todo, completed: !todo.completed }
        dispatch({ type: "UPDATE_TODO", payload: updated })

        try {
            await todoService.updateTodo(updated)
        } catch (err) {
            dispatch({ type: "UPDATE_TODO", payload: todo })
            dispatch({ type: "FETCH_ERROR", payload: "Failed to update todo" })
        }
    }, [dispatch, todos])

    const updateTodoText = useCallback(async (id: string, text: string) => {
        const todo = todos.find((t) => t.id === id)
        if (!todo) return

        const updated = { ...todo, text }
        dispatch({ type: "UPDATE_TODO", payload: updated })

        try {
            await todoService.updateTodo(updated)
        } catch (err) {
            dispatch({ type: "UPDATE_TODO", payload: todo })
            dispatch({ type: "FETCH_ERROR", payload: "Failed to update todo" })
        }
    }, [dispatch, todos])

    const deleteTodo = useCallback(async (id: string) => {
        try {
            await todoService.deleteTodo(id)
            dispatch({ type: "DELETE_TODO", payload: id })
        } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: "Failed to delete todo" })
        }
    }, [dispatch])

    return {
        loadTodos,
        addTodo,
        toggleComplete,
        updateTodoText,
        deleteTodo,
    }
}
