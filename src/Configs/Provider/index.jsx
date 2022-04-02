import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { BrowserRouter } from "react-router-dom";

import {
  GlobalTheme,
  PrefersTheme,
  storagePrefersThemeSave,
  themeInterpreter,
  Themes,
} from "@/Configs/Themes";

import { Auth } from "@/Configs/Firebase-config";

import { Base, Spinner } from "@/Pages";

import { ThemeProvider } from "styled-components";

const CurrentProvider = createContext();

export function useProvider() {
  return useContext(CurrentProvider);
}

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);

  //Try check if user is logged in
  useEffect(() => {
    Auth.onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
      setPending(false);
    });
  }, []);

  const [currentTheme, setCurrentTheme] = useState(PrefersTheme);

  const ToggleThemeFunction = useCallback(() => {
    setCurrentTheme(currentTheme === Themes.dark ? Themes.light : Themes.dark);
  }, [currentTheme]);

  useEffect(() => {
    storagePrefersThemeSave(currentTheme);
  }, [currentTheme]);

  const ParammetersProvided = {
    Auth: {
      User: user,
    },
    Theme: {
      isDarkMode: themeInterpreter(currentTheme),
      Toggle: ToggleThemeFunction,
    },
  };
  return (
    <BrowserRouter>
      <CurrentProvider.Provider value={ParammetersProvided}>
        <ThemeProvider theme={currentTheme}>
          <GlobalTheme />
          {!pending && children}
          {pending && <Base><Spinner /></Base>}
        </ThemeProvider>
      </CurrentProvider.Provider>
    </BrowserRouter>
  );
};
