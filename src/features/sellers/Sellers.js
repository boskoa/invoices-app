import { useSelector } from "react-redux";
import { selectAllSellers } from "./sellersSlice";

function Sellers() {
  const sellers = useSelector(selectAllSellers);

  return (
    <div>
      {sellers.map((seller) => (
        <p key={seller.id}>
          {seller.companyName}, {seller.hqAddress}
        </p>
      ))}
    </div>
  );
}

export default Sellers;
