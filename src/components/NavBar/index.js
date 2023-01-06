import { styled } from "@mui/material/styles";
import {
  Box,
  SpeedDialAction,
  SpeedDialIcon,
  SpeedDial,
  IconButton,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    margin: theme.spacing(1),
  },
}));

const actions = [
  {
    icon: (
      <IconButton component={Link} to="/invoices">
        <ReceiptLongIcon />
      </IconButton>
    ),
    name: "Invoices",
  },
  {
    icon: (
      <IconButton component={Link} to="/sellers">
        <StorefrontIcon />
      </IconButton>
    ),
    name: "Sellers",
  },
  {
    icon: (
      <IconButton component={Link} to="/customers">
        <ShoppingCartIcon />
      </IconButton>
    ),
    name: "Customers",
  },
];

function NavBar() {
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        width: 70,
        position: "fixed",
      }}
    >
      <Box
        sx={{
          height: 250,
        }}
      >
        <StyledSpeedDial
          ariaLabel="SpeedDial navbar"
          icon={<SpeedDialIcon />}
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}

export default NavBar;
