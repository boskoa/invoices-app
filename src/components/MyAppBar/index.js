import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ThemeSwitch from "./ThemeSwitch";
import { Link } from "react-router-dom";

function MyAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="success">
        <Toolbar variant="dense">
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            sx={{ width: "100%" }}
          >
            <IconButton
              component={Link}
              to="/"
              title="Home"
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{ mr: 1 }}
            >
              <AttachMoneyIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Invoices app
            </Typography>
            <ThemeSwitch />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyAppBar;
