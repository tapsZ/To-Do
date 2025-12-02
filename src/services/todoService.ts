export interface Todo {
    id: string
    text: string
    completed: boolean
    createdAt: number
}

const STORAGE_KEY = "tz-todos"
const DELAY = 2000

const getDb = (): Todo[] => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

const setDb = (todos: Todo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export const todoService = {
    //GET
    getTodos: async (): Promise<Todo[]> => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return getDb()
    },

    //POST
    addTodo: async (text: string): Promise<Todo> => {
        await new Promise((resolve) => setTimeout(resolve, DELAY))
        const todos = getDb()
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
        }
        setDb([newTodo, ...todos])
        return newTodo
    },

    //PUT
    updateTodo: async (updatedTodo: Todo): Promise<Todo> => {
        await new Promise((resolve) => setTimeout(resolve, DELAY))
        const todos = getDb()
        const newTodos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
        setDb(newTodos)
        return updatedTodo
    },

    //DELETE
    deleteTodo: async (id: string): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, DELAY))
        const todos = getDb()
        const newTodos = todos.filter((t) => t.id !== id)
        setDb(newTodos)
    },
}
