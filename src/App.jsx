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
import Logout from "./components/Logout.tsx";
import { DashboardBanner } from "./AdminPannel/Banner/DashboardBanner.tsx";
import OrderTable from "./AdminPannel/DataTable/Orders/OrderTable";
import { Poster } from "./AdminPannel/Poster/Poster.tsx";
import Checkout from "./pages/Checkout.tsx";
import Notifications from "./AdminPannel/Notifications.tsx";
import AdminLogin from "./AdminPannel/AdminLogin.tsx";
import Settings from "./pages/Settings.tsx";
import Help from "./AdminPannel/Help.tsx";
import RoleTable from "./AdminPannel/Role/RoleTable.tsx";
import PermissionTable from "./AdminPannel/Permission/PermissionTable.tsx";
import UsersTable from "./AdminPannel/User/UsersTable.tsx";
import AdminRoute from "./routes/AdminRoute.tsx";
import SaveForLetterProduct from "./pages/SaveForLetterProduct.tsx";

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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paymentPage" element={<Paymentpage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/saveForLetterProduct" element={<SaveForLetterProduct />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        {/*Admin Dashboard  */}
        <Route
          path="adminDashboard"
          element={
            <AdminRoute>
              <DashboardMainPage />
            </AdminRoute>
          }
        >
          <Route path="adminDashboardHome" element={<DashboardHomePage />} />
          <Route index element={<DashboardHomePage />} />
          <Route path="productTable" element={<ProductTable />} />
          <Route path="categoryTable" element={<CategoryTable />} />
          <Route path="subcategoryTable" element={<SubcategoryTable />} />
          <Route path="brandTable" element={<BrandTable />} />
          <Route path="banner" element={<DashboardBanner />} />
          <Route path="orderTable" element={<OrderTable />} />
          <Route path="posterDashboard" element={<Poster />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="roleTable" element={<RoleTable />} />
          <Route path="permissionTable" element={<PermissionTable />} />
          <Route path="usersTable" element={<UsersTable />} />
        </Route>
        <Route path="IsLoggedIn" element={<IsLoggedIn />} />
        <Route path="AdminLogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default App;
