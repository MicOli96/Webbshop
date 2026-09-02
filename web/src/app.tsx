import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import AdminPage from "./pages/admin/adminPage";
import ProductFormDialog from "./pages/admin/productFormDialog";
import Home from "./pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<AdminPage />}>
            <Route path="products/new" element={<ProductFormDialog />} />
            <Route path="products/:id/edit" element={<ProductFormDialog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
