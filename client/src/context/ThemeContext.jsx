import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const mode = localStorage.getItem("mode");
    return mode === "dark" || (!mode && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  }, [isDark]);

  const toggleMode = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
