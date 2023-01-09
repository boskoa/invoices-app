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
    const oldTheme = window.localStorage.getItem("invoiceAppTheme");
    if (oldTheme) {
      dispatch(changeTheme(oldTheme));
    }
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ m: { xs: "auto", sm: "5px" } }}
    >
      <LightModeIcon fontSize="small" color="inherit" />
      <Switch
        size="small"
        checked={theme === "dark"}
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          dispatch(changeTheme(newTheme));
          window.localStorage.setItem("invoiceAppTheme", newTheme);
        }}
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
