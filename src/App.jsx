import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SelectProductResults from "./pages/SelectProductResults";
import SearchResult from "./pages/SearchResult";
import SelectCategoryResults from "./pages/SelectCategoryResults";
import IsLoggedIn from "./pages/IsLoggedIn";
import MainCartPage from "./pages/MainCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Wishlist from "./pages/Wishlist";
import ScrollTop from "./components/ScrollTop";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import Paymentpage from "./pages/Paymentpage";
import DashboardMainPage from "./AdminPannel/DashboardMainPage.tsx";
import DashboardHomePage from "./AdminPannel/DashboardHomePage";
import ProductTable from "./AdminPannel/DataTable/Product/ProductTable.tsx";
import CategoryTable from "./AdminPannel/DataTable/Category/CategoryTable.tsx";
import SubcategoryTable from "./AdminPannel/DataTable/Subcategory/SubcategoryTable.tsx";
import BrandTable from "./AdminPannel/DataTable/Brands/BrandTable.tsx";

const App = () => {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Mainpage />}>
          <Route path="/home" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/:productId" element={<ProductDetail />} />
          <Route
            path="/selectProductResult/:id"
            element={<SelectProductResults />}
          />
          <Route path="/searchResult/:query" element={<SearchResult />} />
          <Route
            path="/selectCategoryResult/:categoryID"
            element={<SelectCategoryResults />}
          />
          <Route path="/mainCartPage" element={<MainCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/myWishList" element={<Wishlist />} />
          <Route path="/orderSummaryPage" element={<OrderSummaryPage />} />
          <Route path="/paymentPage" element={<Paymentpage />} />
        </Route>
        {/*Admin Dashboard  */}
        <Route path="adminDashboard" element={<DashboardMainPage />}>
          <Route path="adminDashboardHome" element={<DashboardHomePage />} />
          <Route index element={<DashboardHomePage />} />
          <Route path="productTable" element={<ProductTable/>}/>
          <Route path="categoryTable" element={< CategoryTable/>}/>
          <Route path="subcategoryTable" element={< SubcategoryTable/>}/>
          <Route path="brandTable" element={< BrandTable/>}/>
        </Route>
        <Route path="IsLoggedIn" element={<IsLoggedIn />} />
      </Routes>
    </>
  );
};

export default App;
