import { useSelector } from "react-redux";
import { selectAllInvoices } from "./invoicesSlice";

function Invoices() {
  const invoices = useSelector(selectAllInvoices);

  return (
    <div>
      {invoices.map((invoice) => (
        <p key={invoice.id}>
          {invoice.amount}, {invoice.date}
        </p>
      ))}
    </div>
  );
}

export default Invoices;
