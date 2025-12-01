import React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { Button } from "../ui/Button"

export const Header: React.FC = () => {
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2 font-bold">
                    <span className="text-2xl font-serif tracking-tight">
                        <span className="text-primary">TZ</span>
                        <span className="text-secondary ml-2">Todo</span>
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="h-9 w-9 px-0"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    )
}
