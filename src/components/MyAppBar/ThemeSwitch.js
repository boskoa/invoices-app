import { Stack } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  changeTheme,
  selectCurrentTheme,
} from "../../features/settings/settingsSlice";

function ThemeSwitch() {
  const theme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("THEME CHANGE", theme);
  }, [theme]);

  return (
    <Stack direction="row" alignItems="center" sx={{ m: "3px", ml: "auto" }}>
      <LightModeIcon
        fontSize="small"
        color={theme === "light" ? "warning" : "inherit"}
      />
      <Switch
        size="small"
        checked={theme === "dark"}
        onClick={() =>
          dispatch(changeTheme(theme === "light" ? "dark" : "light"))
        }
        title="set dark mode"
      />
      <DarkModeIcon
        fontSize="small"
        color={theme === "dark" ? "warning" : "inherit"}
      />
    </Stack>
  );
}

export default ThemeSwitch;
