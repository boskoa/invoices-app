import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import { selectAllCustomers } from "./customersSlice";

function Customers() {
  const customers = useSelector(selectAllCustomers);

  return (
    <Stack alignItems="center">
      <PageTitle title="Customers" />
      <TableButtons />
      <DataTable heads={Object.keys(customers[0])} />
      {customers.map((customer) => (
        <p key={customer.id}>
          {customer.surname}, {customer.name}
        </p>
      ))}
    </Stack>
  );
}

export default Customers;
