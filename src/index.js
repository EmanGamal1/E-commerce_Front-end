import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./Dashboard/Assets/plugins/nucleo/css/nucleo.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard/Assets/scss/argon-dashboard-react.scss";
import "./index.css";

import AdminLayout from "./Dashboard/Layouts/Admin.js";
import AuthLayout from "./Dashboard/Layouts/Auth.js";
import Home from "Website/Pages/HomePage/HomePage";
import { Authentication } from "Context/Authentication ";
import ForgetPssword from "Dashboard/Components/Forgot/ForgetPassword";
import Login from "Dashboard/Pages/Login/Login";
import Products from "./Website/Pages/Products/Products";
import Orders from "Website/Pages/Orders/Orders";
import OrderDetail from "Website/Pages/Orders/OrderDetails/OrderDetail";
import AboutUS from "Website/Pages/AboutUs/AboutUs";
import ContactUs from "Website/Pages/ContactUS/ContactUs";
import Cart from "Website/Pages/Cart/Cart";
import Checkout from "Website/Pages/Checkout/Checkout";
import LoginSite from "./Website/Pages/Login/Login";
import NavBar from "Website/components/NavBar/NavBar";
import FooterSite from "Website/components/Footer/FooterSite";
import "@fontsource/almarai";
import "./website.css";
import TermsAndConditions from "Website/Pages/TermsAndConditions/TermsAndConditions";
import Profile from "Website/Pages/Profile/Profile";
import Address from "Website/Pages/Address/AddressList/AddressList";
import AddressEdit from "Website/Pages/Address/AddressEdit/AddressEdit";
import AddressAdd from "Website/Pages/Address/AddressAdd/AddressAdd";
import { AllCategoryPage } from "./Website/Pages/Categories/AllCategoryPage";
import CategoryProducts from "Website/Pages/Categories/CategoryProdusts";
import ProductDetails from "Website/Pages/Products/ProductDetails/ProductDetails";
import Registration from "./Website/Pages/Registration/Registration";
import { ForgetPassword } from "./Website/Pages/ForgetPassword/ForgetPassword";
import VerifyEmail from "./Website/Pages/verifyEmail/VerifyEmail";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <Authentication>
  <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/home" element={<div dir="rtl" className="websitePages"><NavBar/><Home/><FooterSite /></div>} />
      <Route path="/categories" element={<div dir="rtl" className="websitePages"><NavBar/><CategoryCard/><FooterSite /></div>} />
      <Route path="/products" element={<div dir="rtl" className="websitePages"><NavBar/><Products/><FooterSite /></div>} />
      <Route path="/orders" element={<div dir="rtl" className="websitePages"><NavBar/><Orders/><FooterSite /></div>} />
      <Route path="/orders/OrderDetail/:id" element={<div dir="rtl" className="websitePages"><NavBar/><OrderDetail/><FooterSite /></div>} />
      <Route path="/aboutus" element={<div dir="rtl" className="websitePages"><NavBar/><AboutUS/><FooterSite /></div>} />
      <Route path="/contactus" element={<div dir="rtl" className="websitePages"><NavBar/><ContactUs/><FooterSite /></div>} />
      <Route path="/cart" element={<div dir="rtl" className="websitePages"><NavBar/><Cart/><FooterSite /></div>} />
      <Route path="/termsAndConditions" element={<div dir="rtl" className="websitePages"><NavBar/><TermsAndConditions/><FooterSite /></div>} />
      <Route path="/profile" element={<div dir="rtl" className="websitePages"><NavBar/><Profile/><FooterSite /></div>} />
      <Route path="/address" element={<div dir="rtl" className="websitePages"><NavBar/><Address/><FooterSite /></div>} />
      <Route path="/auth/login" element={<LoginSite/>} />
      
      <Route path="/login/*" element={<Login/>} />
      <Route path="/ForgetPssword/*" element={<ForgetPssword/>} />
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  </Authentication>    */}
    <Authentication>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
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
          path="/categories/:slug/products"
          element={
            <div dir="rtl" className="websitePages">
              <NavBar />
              <CategoryProducts />
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
        <Route path="/auth/login" element={<LoginSite />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route path="/login/*" element={<Login />} />
        <Route path="/ForgetPssword/*" element={<ForgetPssword />} />
        <Route path="*" element={<Navigate to="/admin/index" replace />} />
      </Routes>
    </Authentication>
  </BrowserRouter>
);
