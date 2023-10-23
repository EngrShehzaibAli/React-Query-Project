import { createContext, useContext, useState, useEffect } from 'react';
const AppContext = createContext();
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';
  if (storedDarkMode === null) {
    return prefersDarkMode;
  }
  if (storedDarkMode !== null) {
    return storedDarkMode === 'true';
  }
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const themeToggle = () => {
    const themeValue = !isDarkTheme;
    setIsDarkTheme(themeValue);
    localStorage.setItem('darkTheme', themeValue);
  };
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, themeToggle, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
