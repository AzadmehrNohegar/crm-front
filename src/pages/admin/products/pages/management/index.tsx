import { Route, Routes } from "react-router-dom";

function ProductsManagement() {
  return (
    <Routes>
      <Route index element={<>index</>} />
      <Route path="create" element={<>create</>} />
    </Routes>
  );
}

export default ProductsManagement;
