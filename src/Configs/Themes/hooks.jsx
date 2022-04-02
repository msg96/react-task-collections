import { DarkTheme } from "./Dark";
import { LightTheme } from "./Light";

export const Themes = {
  dark: DarkTheme,
  light: LightTheme,
};

function systemPrefersTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return Themes.dark;
  } else {
    return Themes.light;
  }
}

export function PrefersTheme() {
  var sessionThemed = localStorage.getItem("PreferTheme");
  let ThemeInterpreter =
    sessionThemed === "dark"
      ? Themes.dark
      : sessionThemed
      ? Themes.light
      : systemPrefersTheme();
  return ThemeInterpreter;
}

export function storagePrefersThemeSave(currentTheme) {
  let PreferTheme = currentTheme === Themes.dark ? "dark" : "light";
  localStorage.setItem("PreferTheme", PreferTheme);
}

export const themeInterpreter = (themeObj) => {
  if (themeObj === Themes.dark) {
    return true;
  }
  if (themeObj === Themes.light) {
    return false;
  }
};
