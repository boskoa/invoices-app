import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const [selected, setSelected] = useState(null);
  const location = useLocation().pathname;

  function handleChange(event, nextSelected) {
    if (nextSelected !== null) {
      setSelected(nextSelected);
    }
    return;
  }

  useEffect(() => {
    setSelected(location);

    return () => setSelected(null);
  }, [location]);

  return (
    <Box
      sx={{
        margin: 1,
        position: "fixed",
      }}
    >
      <ToggleButtonGroup
        sx={{ width: "40px" }}
        orientation="vertical"
        value={selected}
        exclusive
        color="success"
        onChange={handleChange}
        aria-label="vertical button group"
      >
        <ToggleButton
          component={Link}
          to="/invoices"
          value="/invoices"
          title="Invoices"
        >
          <ReceiptLongIcon />
        </ToggleButton>
        <ToggleButton
          component={Link}
          to="/sellers"
          value="/sellers"
          title="Sellers"
        >
          <StorefrontIcon />
        </ToggleButton>
        <ToggleButton
          component={Link}
          to="/customers"
          value="/customers"
          title="Customers"
        >
          <PeopleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default NavBar;
