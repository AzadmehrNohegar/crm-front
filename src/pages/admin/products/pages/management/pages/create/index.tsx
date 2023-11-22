import { ProductsManagementCreateWholeSale } from "./partials/wholeSale";
import { ProductsManagementCreatePacking } from "./partials/packing";
import { Navigate, useSearchParams } from "react-router-dom";

function ProductsManagementCreate() {
  const [searchParams] = useSearchParams();
  if (searchParams.get("type") === "WHOLESALE")
    return <ProductsManagementCreateWholeSale />;
  if (searchParams.get("type") === "PACKING")
    return <ProductsManagementCreatePacking />;
  return <Navigate to=".." />;
}

export default ProductsManagementCreate;
