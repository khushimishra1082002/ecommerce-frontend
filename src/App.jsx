import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SearchResult from "./pages/SearchResult";
import SelectCategoryResults from "./pages/SelectCategoryResults";
import IsLoggedIn from "./pages/IsLoggedIn";
import MainCartPage from "./pages/MainCartPage";
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
import UserProfilePage from "./pages/user/UserProfilePage.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import MyOrders from "./pages/user/MyOrders.tsx";
import OrderHistory from "./pages/user/OrderHistory.tsx";
import Logout from "./components/Logout.tsx";
import {DashboardBanner} from "./AdminPannel/Banner/DashboardBanner.tsx";
import OrderTable from "./AdminPannel/DataTable/Orders/OrderTable";

const App = () => {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Mainpage />}>
          <Route path="/home" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/:productId" element={<ProductDetail />} />
          
          <Route path="/searchResult/:query" element={<SearchResult />} />
          <Route
            path="/selectCategoryResult/:categoryID"
            element={<SelectCategoryResults />}
          />
          <Route path="/mainCartPage" element={<MainCartPage />} />
          <Route path="/myWishList" element={<Wishlist />} />
          <Route path="/orderSummaryPage" element={<OrderSummaryPage />} />
          <Route path="/paymentPage" element={<Paymentpage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        {/*Admin Dashboard  */}
        <Route path="adminDashboard" element={<DashboardMainPage />}>
          <Route path="adminDashboardHome" element={<DashboardHomePage />} />
          <Route index element={<DashboardHomePage />} />
          <Route path="productTable" element={<ProductTable />} />
          <Route path="categoryTable" element={<CategoryTable />} />
          <Route path="subcategoryTable" element={<SubcategoryTable />} />
          <Route path="brandTable" element={<BrandTable />} />
          <Route path="banner" element={<DashboardBanner />} />
          <Route path="orderTable" element={<OrderTable />} />

        </Route>
        <Route path="IsLoggedIn" element={<IsLoggedIn />} />
      </Routes>
    </>
  );
};

export default App;
