import React from "react"
import { Check, X } from "lucide-react"
import { Button } from "../../../../components/ui/Button"
import { Input } from "../../../../components/ui/Input"

interface TodoItemEditProps {
    editText: string
    setEditText: (text: string) => void
    handleUpdate: () => void
    handleCancel: () => void
}

export const TodoItemEdit: React.FC<TodoItemEditProps> = ({
    editText,
    setEditText,
    handleUpdate,
    handleCancel,
}) => {
    return (
        <div className="flex items-center gap-2">
            <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="h-8"
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdate()
                    if (e.key === "Escape") handleCancel()
                }}
            />
            <Button size="sm" variant="ghost" onClick={handleUpdate} className="h-8 w-8 p-0">
                <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0">
                <X className="h-4 w-4 text-red-500" />
            </Button>
        </div>
    )
}
