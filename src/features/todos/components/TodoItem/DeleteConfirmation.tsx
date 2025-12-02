import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "../../../../components/ui/Button"
import { Modal } from "../../../../components/ui/Modal"

interface DeleteConfirmationProps {
    isOpen: boolean
    isDeleting: boolean
    todoText: string
    onClose: () => void
    onConfirm: () => void
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    isOpen,
    isDeleting,
    todoText,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => !isDeleting && onClose()}
            title="Delete Task"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
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
                Are you sure you want to delete "{todoText}"? This action cannot be undone.
            </p>
        </Modal>
    )
}
