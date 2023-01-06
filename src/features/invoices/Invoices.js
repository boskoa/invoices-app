import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import { selectAllInvoices } from "./invoicesSlice";

function Invoices() {
  const invoices = useSelector(selectAllInvoices);

  return (
    <Stack alignItems="center">
      <PageTitle title="Invoices" />
      <TableButtons />
      {invoices.map((invoice) => (
        <p key={invoice.id}>
          {invoice.amount}, {invoice.date}
        </p>
      ))}
    </Stack>
  );
}

export default Invoices;
