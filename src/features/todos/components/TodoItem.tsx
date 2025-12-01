import React, { useState } from "react"
import { Trash2, Edit2, Check, X, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import type { Todo } from "../../../services/todoService"
import { useTodos } from "../../../context/TodoContext"
import { Checkbox } from "../../../components/ui/Checkbox"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { Modal } from "../../../components/ui/Modal"
import { cn } from "../../../utils/cn"

interface TodoItemProps {
    todo: Todo
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { toggleComplete, deleteTodo, updateTodoText } = useTodos()
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleUpdate = () => {
        if (editText.trim()) {
            updateTodoText(todo.id, editText)
            setIsEditing(false)
        }
    }

    const handleCancel = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        await deleteTodo(todo.id)
    }

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                    "group flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm transition-colors hover:bg-accent/50",
                    todo.completed && "opacity-60"
                )}
            >
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleComplete(todo.id)}
                    className="mt-0.5"
                />

                <div className="flex-1">
                    {isEditing ? (
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
                    ) : (
                        <span
                            className={cn(
                                "block text-sm transition-all",
                                todo.completed && "text-muted-foreground line-through"
                            )}
                            onDoubleClick={() => setIsEditing(true)}
                        >
                            {todo.text}
                        </span>
                    )}
                </div>

                {!isEditing && (
                    <div className="flex items-center opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditing(true)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </motion.div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
                title="Delete Task"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </>
                }
            >
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete "{todo.text}"? This action cannot be undone.
                </p>
            </Modal>
        </>
    )
}
