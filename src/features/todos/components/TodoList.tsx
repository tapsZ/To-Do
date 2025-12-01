import React from "react"
import { AnimatePresence } from "framer-motion"
import { useTodos } from "../../../context/TodoContext"
import { TodoItem } from "./TodoItem"

export const TodoList: React.FC = () => {
    const { todos, filter, isLoading, error } = useTodos()

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })

    if (isLoading && todos.length === 0) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                {error}
            </div>
        )
    }

    if (filteredTodos.length === 0) {
        return (
            <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                <p>No todos found</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <AnimatePresence initial={false}>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </AnimatePresence>
        </div>
    )
}
