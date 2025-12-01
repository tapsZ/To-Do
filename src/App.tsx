import { ThemeProvider } from "./context/ThemeContext"
import { TodoProvider } from "./context/TodoContext"
import { Header } from "./components/layout/Header"
import { TodoList } from "./features/todos/components/TodoList"
import { TodoForm } from "./features/todos/components/TodoForm"
import { TodoFilter } from "./features/todos/components/TodoFilter"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="tz-theme">
      <TodoProvider>
        <div className="min-h-screen bg-background font-sans antialiased transition-colors duration-300">
          <Header />
          <main className="container max-w-2xl py-6 md:py-10 px-4">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
                <p className="text-muted-foreground">
                  Manage your daily tasks efficiently.
                </p>
              </div>

              <div className="space-y-4">
                <TodoForm />
                <div className="flex items-center justify-between overflow-x-auto pb-2">
                  <TodoFilter />
                </div>
                <TodoList />
              </div>
            </div>
          </main>
        </div>
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
