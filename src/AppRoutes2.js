import { Route, Routes, Outlet } from "react-router-dom";
import loadable from "@loadable/component";
import AuthLayout from "./Dashboard/Layouts/Auth";
import NavBar from "./Website/components/NavBar/NavBar";
import FooterSite from "./Website/components/Footer/FooterSite";
import { AllCategoryPage } from "./Website/Pages/Categories/AllCategoryPage";
import AboutUS from "./Website/Pages/AboutUs/AboutUs";
import ContactUs from "./Website/Pages/ContactUS/ContactUs";
import Cart from "./Website/Pages/Cart/Cart";
import TermsAndConditions from "./Website/Pages/TermsAndConditions/TermsAndConditions";
import Profile from "./Website/Pages/Profile/Profile";
import Address from "./Website/Pages/Address/AddressList/AddressList";
import AddressEdit from "./Website/Pages/Address/AddressEdit/AddressEdit";
import AddressAdd from "./Website/Pages/Address/AddressAdd/AddressAdd";
import ProductDetails from "./Website/Pages/Products/ProductDetails/ProductDetails";
import LoginSite from "./Website/Pages/Login/Login";
import Registration from "./Website/Pages/Registration/Registration";
import VerifyEmail from "./Website/Pages/verifyEmail/VerifyEmail";
import ForgetPasswordSite from "./Website/Pages/ForgetPassword/ForgetPassword";
import ForgetPssword from "./Dashboard/Components/Forgot/ForgetPassword";
import PageNotFound from "./SharedUi/PageNotFound";
import React from "react";
import ProtectedRoute from "./Website/components/Uitily/ProtectedRoute";
import ProtectedRouteHook from "./Website/hook/auth/ProtectedRouteHook";
import ProductsByCategory from "./Website/Pages/Products/ProductsByCategory";
import ConfirmNewPassword from "Dashboard/Components/ConfirmNewPassword/ConfirmNewPassword";
import ResetPasswordSite from "./Website/Pages/ResetPasswordSite/ResetPasswordSite";

const Checkout = loadable(() => import("./Website/Pages/Checkout/Checkout"));
const Products = loadable(() => import("./Website/Pages/Products/Products"));
const Orders = loadable(() =>
  import("./Website/Pages/Orders/OrdersList/Orders")
);
const OrderDetail = loadable(() =>
  import("./Website/Pages/Orders/OrderDetails/OrderDetail")
);

const Login = loadable(() => import("./Dashboard/Pages/Login/Login"));
const Home = loadable(() => import("./Website/Pages/HomePage/HomePage"));
const AdminLayout = loadable(() => import("./Dashboard/Layouts/Admin"));

const AppRoutes = () => {
  const [isUser, isAdmin, isGuest, userData] = ProtectedRouteHook();
  console.log("guest", isGuest);
  console.log("user", isUser);
  console.log("admin", isAdmin);

  return (
    <>
      <Routes>
        
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/ForgetPssword" element={<ForgetPssword />} />
        <Route path="/auth/reset-password/:token/:email" element={<ConfirmNewPassword />} />

        {/*<Route
          path="/auth/*"
          element={
            <ProtectedRoute auth={isUser} redirect="/login">
              <AuthLayout />
            </ProtectedRoute>
          }
        />*/}
   <Route
          path="/admin/*"
          element={
            <ProtectedRoute auth={isAdmin} path="login" redirect="index">
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        
        {/*for Website*/}

        <Route
          path="/"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Outlet />
              <FooterSite />
            </div>
          }
        >
          <Route path="/forgot-password" element={<ForgetPasswordSite />} />
          <Route path="/reset-password/:token" element={<ResetPasswordSite />} />
          <Route path="/login" element={<LoginSite />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/categories" element={<AllCategoryPage />} />
          <Route
            path="/categories/:slug/products"
            element={<ProductsByCategory />}
          />
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/OrderDetail/:id" element={<OrderDetail />} />
          <Route path="/aboutus" element={<AboutUS />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<Address />} />
          <Route path="/address/:id/edit" element={<AddressEdit />} />
          <Route path="/address/add" element={<AddressAdd />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          {/*<Route path="*" element={<PageNotFound />} />*/}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
