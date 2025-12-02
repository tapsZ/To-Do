import React from "react"
import { useTodos } from "../../../context/todo/TodoContext"
import { Button } from "../../../components/ui/Button"
import { cn } from "../../../utils/cn"
import type {Todo} from "../../../services/todoService.ts";

export const TodoFilter: React.FC = () => {
    const { filter, setFilter, todos } = useTodos()

    const activeCount = todos.filter((t:Todo):boolean => !t.completed).length
    const completedCount = todos.filter((t:Todo):boolean => t.completed).length

    return (
        <div className="flex items-center gap-2">
            <Button
                variant={filter === "all" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className={cn(filter === "all" && "bg-primary text-primary-foreground")}
            >
                All ({todos.length})
            </Button>
            <Button
                variant={filter === "active" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilter("active")}
            >
                Active ({activeCount})
            </Button>
            <Button
                variant={filter === "completed" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFilter("completed")}
            >
                Completed ({completedCount})
            </Button>
        </div>
    )
}
