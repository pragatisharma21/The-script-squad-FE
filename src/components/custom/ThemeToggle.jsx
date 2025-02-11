/* eslint-disable react/prop-types */
import { useTheme } from "@/context/ThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = ({ text = "" }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      onClick={toggleTheme}
      className="flex justify-center items-center gap-2"
    >
      <button className="p-1 rounded-full bg-secondary  text-secondary-foreground hover:bg-muted transition">
        {theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
      </button>
      {text}
    </div>
  );
};

export default ThemeToggle;
