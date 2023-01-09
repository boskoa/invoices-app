import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { IconButton, Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Stack
      direction={{ sm: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success">
              <IconButton component={Link} to="/sellers" color="inherit">
                <StorefrontIcon />
              </IconButton>
            </TimelineDot>
            <TimelineConnector sx={{ height: "5rem" }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">
              See all sellers data, create new sellers, edit or delete existing
              ones, track inactive subjects.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="info">
              <IconButton component={Link} to="/customers" color="inherit">
                <PeopleIcon />
              </IconButton>
            </TimelineDot>
            <TimelineConnector sx={{ height: "5rem" }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">
              See all customers, create new ones, edit or delete existing ones,
              sort them by any property.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="warning">
              <IconButton component={Link} to="/invoices" color="inherit">
                <ReceiptLongIcon />
              </IconButton>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">
              Track all invoices, create new ones (if the seller is active),
              edit or delete existing ones.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Stack>
  );
}

export default HomePage;
