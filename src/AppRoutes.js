import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./Dashboard/Layouts/Admin";
import AuthLayout from "./Dashboard/Layouts/Auth";
import Login from "./Dashboard/Pages/Login/Login";
import NavBar from "./Website/components/NavBar/NavBar";
import Home from "./Website/Pages/HomePage/HomePage";
import FooterSite from "./Website/components/Footer/FooterSite";
import { AllCategoryPage } from "./Website/Pages/Categories/AllCategoryPage";
import Products from "./Website/Pages/Products/Products";
import Orders from "./Website/Pages/Orders/Orders";
import OrderDetail from "./Website/Pages/Orders/OrderDetails/OrderDetail";
import AboutUS from "./Website/Pages/AboutUs/AboutUs";
import ContactUs from "./Website/Pages/ContactUS/ContactUs";
import Cart from "./Website/Pages/Cart/Cart";
import Checkout from "./Website/Pages/Checkout/Checkout";
import TermsAndConditions from "./Website/Pages/TermsAndConditions/TermsAndConditions";
import Profile from "./Website/Pages/Profile/Profile";
import Address from "./Website/Pages/Address/AddressList/AddressList";
import AddressEdit from "./Website/Pages/Address/AddressEdit/AddressEdit";
import AddressAdd from "./Website/Pages/Address/AddressAdd/AddressAdd";
import ProductDetails from "./Website/Pages/Products/ProductDetails/ProductDetails";
import LoginSite from "./Website/Pages/Login/Login";
import Registration from "./Website/Pages/Registration/Registration";
import VerifyEmail from "./Website/Pages/verifyEmail/VerifyEmail";
import { ForgetPassword } from "./Website/Pages/ForgetPassword/ForgetPassword";
import ForgetPssword from "./Dashboard/Components/Forgot/ForgetPassword";
import PageNotFound from "./SharedUi/PageNotFound";
import React, { useContext, useEffect } from "react";
import AuthContext from "./Context/Authentication ";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const getUser = () => {
    const user = localStorage.getItem("admin-user");
    const currntUser = JSON.parse(user);
    console.log("cuser", currntUser);
    if (currntUser) return currntUser;
    else return null;
  };
  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={getUser() ? <AdminLayout /> : <Navigate to="/admin/login" />}
        />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route
          path="/admin/login"
          element={getUser() ? <Navigate to="/admin/index" /> : <Login />}
        />
        <Route
          path="/home"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Home />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/categories"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <AllCategoryPage />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/products"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Products />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/orders"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Orders />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/orders/OrderDetail/:id"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <OrderDetail />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/aboutus"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <AboutUS />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/contactus"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <ContactUs />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Cart />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Checkout />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/termsAndConditions"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <TermsAndConditions />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Profile />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/address"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <Address />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/address/:id/edit"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <AddressEdit />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/address/add"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <AddressAdd />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <ProductDetails />
              <FooterSite />
            </div>
          }
        />
        <Route
          path="/auth/login"
          element={
            <div dir="rtl" className="websitePages">
              <LoginSite />
            </div>
          }
        />
        <Route
          path="/auth/register"
          element={
            <div dir="rtl" className="websitePages">
              <Registration />
            </div>
          }
        />
        <Route
          path="/verify-email/:token"
          element={
            <div dir="rtl" className="websitePages">
              <VerifyEmail />
            </div>
          }
        />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route path="/login" element={<Login />} />
        <Route path="/ForgetPssword" element={<ForgetPssword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
