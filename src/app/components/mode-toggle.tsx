import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { GlowButton } from "./glow-button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" || theme === "system" ? "light" : "dark")}
      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 dark:hidden text-[#F5B942]" />
      <Moon className="h-5 w-5 hidden dark:block text-[#4A9FF5]" />
    </button>
  )
}
