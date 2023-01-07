import { Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import {
  selectAllCustomers,
  selectCustomersError,
  selectCustomersLoading,
} from "./customersSlice";

function Customers() {
  const customers = useSelector(selectAllCustomers);
  const loading = useSelector(selectCustomersLoading);
  const error = useSelector(selectCustomersError);
  const [selected, setSelected] = useState(null);

  const columns = [
    {
      name: "name",
      display: "Name",
    },
    {
      name: "surname",
      display: "Surname",
    },
    {
      name: "age",
      display: "Age",
    },
    {
      name: "id",
      display: "ID",
    },
    {
      name: "address",
      display: "Address",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("CUSTOMERS ERROR", error);
  }

  return (
    <Stack alignItems="center">
      <PageTitle title="Customers" />
      <TableButtons />
      <DataTable
        columns={columns}
        rows={customers}
        selected={selected}
        setSelected={setSelected}
      />
    </Stack>
  );
}

export default Customers;
