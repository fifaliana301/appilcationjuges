"use client";
import { useEffect, useState, useRef } from "react";

import { useTheme } from 'next-themes'

export default function useStateToggleDark(initial = false) {
  const [darkTheme, setDarkTheme] = useState<boolean>(initial);
  const { setTheme } = useTheme()

  const handleToggle = () => {
    setDarkTheme(!darkTheme);
    updateLocalStorage(!darkTheme);
  };

  const storeUserSetPreference = (pref: any) => {
    localStorage.setItem("theme", pref);
  };

  let root: any;
  if (typeof document !== 'undefined') {
    root = document.documentElement;
  }

  useEffect(() => {
    if (localStorage.hasOwnProperty("theme")) {
      const theme = localStorage.getItem("theme");
      setDarkTheme(theme === 'dark')
      updateLocalStorage(theme === 'dark')
    }
  }, [root]);

  const updateLocalStorage = (darkThemeLocal: any) => {
    if (localStorage.hasOwnProperty("theme")) {
      if (darkThemeLocal !== undefined) {
        if (darkThemeLocal) {
          storeUserSetPreference("dark");
          setTheme('dark')
        } else {
          storeUserSetPreference("light");
          setTheme('light')
        }
      }
    }
  };

  return [darkTheme, handleToggle];
}
