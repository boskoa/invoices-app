import { Stack } from "@mui/material";

function PageContainer({ children }) {
  return <Stack sx={{ m: "10px 10px 0px 60px" }}>{children}</Stack>;
}

export default PageContainer;
