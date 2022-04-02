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
import { DarkTheme, LightTheme } from "../Themes";

const CurrentProvider = createContext();

export function useProvider() {
  return useContext(CurrentProvider);
}

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(PrefersTheme);
  const [temas, setTemas] = useState(Themes);
  //Try check if user is logged in
  // useEffect(() => {
  //   Auth.onAuthStateChanged((authenticatedUser) => {
  //     setUser(authenticatedUser);
  //     setPending(false);
  //   });
  // }, []);

  const Checker = useCallback(() => {
    Auth.onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
      setPending(false);
    });
  }, [Auth.currentUser]);

  useEffect(() => {
    Checker();
  }, [Checker]);

  const ToggleThemeFunction = useCallback(() => {
    setCurrentTheme(currentTheme === temas.dark ? temas.light : temas.dark);
  }, [currentTheme]);

  useEffect(() => {
    setTemas(Themes);
  }, [DarkTheme, LightTheme]);

  useEffect(() => {
    storagePrefersThemeSave(currentTheme);
  }, [currentTheme]);

  return (
    <BrowserRouter>
      <CurrentProvider.Provider
        value={{
          Auth: {
            Pending: pending,
            User: user,
          },
          Theme: {
            isDarkMode: themeInterpreter(currentTheme),
            Toggle: ToggleThemeFunction,
          },
        }}
      >
        <ThemeProvider theme={currentTheme}>
          <GlobalTheme />
          {!pending && children}
          {pending && (
            <Base auth={user}>
              <Spinner />
            </Base>
          )}
        </ThemeProvider>
      </CurrentProvider.Provider>
    </BrowserRouter>
  );
};
