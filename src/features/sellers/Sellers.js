import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import { selectAllSellers } from "./sellersSlice";

function Sellers() {
  const sellers = useSelector(selectAllSellers);

  return (
    <Stack alignItems="center">
      <PageTitle title="Sellers" />
      <TableButtons />
      {sellers.map((seller) => (
        <p key={seller.id}>
          {seller.companyName}, {seller.hqAddress}
        </p>
      ))}
    </Stack>
  );
}

export default Sellers;
