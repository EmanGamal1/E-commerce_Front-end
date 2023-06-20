import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import ProductDetails from "Website/Pages/Products/ProductDetails/ProductDetails";
import Registration from "./Website/Pages/Registration/Registration";
import { ForgetPassword } from "./Website/Pages/ForgetPassword/ForgetPassword";
import VerifyEmail from "./Website/Pages/verifyEmail/VerifyEmail";
import PageNotFound from "./SharedUi/PageNotFound";
import AuthContext from "Context/Authentication ";
import AppRoutes from "./AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Authentication>
      <AppRoutes />
    </Authentication>
  </BrowserRouter>
);
