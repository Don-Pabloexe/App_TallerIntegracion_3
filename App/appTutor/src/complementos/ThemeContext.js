import React, { useContext, useState } from 'react';

export const ThemeContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value = {{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

