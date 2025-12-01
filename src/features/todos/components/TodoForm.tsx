import React, { useState } from "react"
import { Plus } from "lucide-react"
import { useTodos } from "../../../context/TodoContext"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"

export const TodoForm: React.FC = () => {
    const { addTodo } = useTodos()
    const [text, setText] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            addTodo(text)
            setText("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1"
            />
            <Button type="submit" disabled={!text.trim()}>
                <Plus className="mr-2 h-4 w-4" />
                Add
            </Button>
        </form>
    )
}
