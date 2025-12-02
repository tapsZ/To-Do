import type { Todo } from "../../services/todoService"

export type TodoState = {
    todos: Todo[]
    isLoading: boolean
    error: string | null
    filter: "all" | "active" | "completed"
}

export type TodoAction =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: Todo[] }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "UPDATE_TODO"; payload: Todo }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "SET_FILTER"; payload: "all" | "active" | "completed" }
