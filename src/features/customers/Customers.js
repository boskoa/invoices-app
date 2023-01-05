import { useSelector } from "react-redux";
import { selectAllCustomers } from "./customersSlice";

function Customers() {
  const customers = useSelector(selectAllCustomers);

  return (
    <div>
      {customers.map((customer) => (
        <p key={customer.id}>
          {customer.surname}, {customer.name}
        </p>
      ))}
    </div>
  );
}

export default Customers;
