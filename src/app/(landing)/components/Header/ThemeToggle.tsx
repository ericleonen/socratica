import TooltipProvider from "@/components/TooltipProvider";
import Icon from "@/theme/Icon";
import { useLocalStorage } from "@/utils/localStorage"
import { Moon, SunOne } from "@icon-park/react";

export default function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    }

    return (
        <button 
            onClick={toggleTheme}
            className="mr-3"
        >
            <Icon type={theme === "light" ? Moon : SunOne} className="text-xl text-slate-700 dark:text-slate-300"/>
        </button>
    )
}