import { Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import {
  selectAllSellers,
  selectSellersError,
  selectSellersLoading,
} from "./sellersSlice";

function Sellers() {
  const sellers = useSelector(selectAllSellers);
  const loading = useSelector(selectSellersLoading);
  const error = useSelector(selectSellersError);
  const [selected, setSelected] = useState(null);

  const columns = [
    {
      name: "companyName",
      display: "Company name",
    },
    {
      name: "hqAddress",
      display: "HQ address",
    },
    {
      name: "id",
      display: "ID",
    },
    {
      name: "isActive",
      display: "Active",
      format: (value) => value.toString(),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("SELLERS ERROR", error);
  }

  return (
    <Stack alignItems="center">
      <PageTitle title="Sellers" />
      <TableButtons />
      <DataTable
        columns={columns}
        rows={sellers}
        selected={selected}
        setSelected={setSelected}
      />
    </Stack>
  );
}

export default Sellers;
