import { useTheme } from "@/context/ThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition"
    >
      {theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
    </button>
  );
};

export default ThemeToggle;
