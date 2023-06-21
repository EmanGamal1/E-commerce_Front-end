import { Route, Routes } from "react-router-dom";
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
import { ForgetPassword } from "./Website/Pages/ForgetPassword/ForgetPassword";
import ForgetPssword from "./Dashboard/Components/Forgot/ForgetPassword";
import PageNotFound from "./SharedUi/PageNotFound";
import React from "react";
import ProtectedRoute from "./Website/components/Uitily/ProtectedRoute";
import ProtectedRouteHook from "./Website/hook/auth/ProtectedRouteHook";
import ProductsByCategory from "./Website/Pages/Products/ProductsByCategory";

const Checkout = loadable(() => import("./Website/Pages/Checkout/Checkout"));
const Products = loadable(() => import("./Website/Pages/Products/Products"));
const Orders = loadable(() => import("./Website/Pages/Orders/Orders"));
const OrderDetail = loadable(() =>
  import("./Website/Pages/Orders/OrderDetails/OrderDetail")
);
const Login = loadable(() => import("./Dashboard/Pages/Login/Login"));
const Home = loadable(() => import("./Website/Pages/HomePage/HomePage"));
const AdminLayout = loadable(() => import("./Dashboard/Layouts/Admin"));

const AppRoutes = () => {
  const [isUser, isAdmin, isGuest, userData] = ProtectedRouteHook();
  console.log("g", isGuest);
  console.log("u", isUser);
  console.log("a", isAdmin);

  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute auth={isAdmin} path="/admin/login">
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route element={<ProtectedRoute auth={isGuest} path="/admin/index" />}>
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/ForgetPssword" element={<ForgetPssword />} />

          {/*for Website*/}

          <Route
            path="/forgot-password"
            element={
              <div dir="rtl" className="websitePages">
                <ForgetPassword />
              </div>
            }
          />

          <Route
            path="/login"
            element={
              <div dir="rtl" className="websitePages">
                <LoginSite />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div dir="rtl" className="websitePages">
                <Registration />
              </div>
            }
          />
        </Route>
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
              <ProductsByCategory />
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
          path="/verify-email/:token"
          element={
            <div dir="rtl" className="websitePages">
              <VerifyEmail />
            </div>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
