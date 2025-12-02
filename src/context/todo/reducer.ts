import type { TodoState, TodoAction } from "./types"

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
