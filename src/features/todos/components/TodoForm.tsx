import React, { useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { useTodos } from "../../../context/todo/TodoContext"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"

export const TodoForm: React.FC = () => {
    const { addTodo } = useTodos()
    const [text, setText] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            setIsAdding(true)
            await addTodo(text)
            setText("")
            setIsAdding(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1"
                disabled={isAdding}
            />
            <Button type="submit" disabled={!text.trim() || isAdding}>
                {isAdding ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Plus className="mr-2 h-4 w-4" />
                )}
                Add
            </Button>
        </form>
    )
}
