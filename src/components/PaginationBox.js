import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

function PaginationBox({ pages, setPages, offset, setOffset, length }) {
  return (
    <Stack
      direction={{ xs: "column", ssm: "row" }}
      spacing={1}
      justifyContent="flex-end"
      sx={{ m: 1, mt: 2, width: "100%" }}
    >
      <FormControl>
        <InputLabel id="pagination-label">
          <Typography
            color="success.main"
            sx={{ lineHeight: "100%" }}
            variant="subtitle2"
          >
            Rows per page
          </Typography>
        </InputLabel>
        <Select
          sx={{
            color: "darkgreen",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "success.main",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "success.main",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "success.main",
            },
            ".MuiSvgIcon-root ": {
              fill: "darkgreen !important",
            },
            width: "9rem",
          }}
          size="small"
          labelId="pagination-label"
          label="Rows per pa"
          id="pagination"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          autoWidth
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <ButtonGroup color="success" size="small">
        <Button
          disabled={offset < 1}
          sx={{ textTransform: "none" }}
          onClick={() => setOffset((prev) => prev - 1)}
        >
          prev
        </Button>
        <Button sx={{ textTransform: "none", cursor: "default" }}>
          {offset + 1}
        </Button>
        <Button
          disabled={length - (offset + 1) * pages < 1}
          sx={{ textTransform: "none" }}
          onClick={() => setOffset((prev) => prev + 1)}
        >
          next
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default PaginationBox;
