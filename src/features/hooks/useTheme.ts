import { storage } from "@/app/storage";
import { selectTheme } from "@/state/selectors/settings.selector";
import { setTheme } from "@/state/settings.slice";
import { SettingsState } from "@/types/settings.types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useTheme() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load theme from storage on mount
    storage.local.get(['settings']).then((data: { settings?: Partial<SettingsState> }) => {
      if (data.settings?.theme) {
        dispatch(setTheme(data.settings.theme));
      }
      const root = window.document.documentElement;
      root.classList.remove('no-transition');
    });
  }, [dispatch]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
}
