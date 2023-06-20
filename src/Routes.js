import Index from "./Dashboard/Pages/HomePage/Index.js";
import Profile from "./Dashboard/Pages/Profile/Profile.js";
import Login from "./Dashboard/Pages/Login/Login.js";
import Orders from "./Dashboard/Pages/Orders/OrderList/OrderList.js";
import Products from "./Dashboard/Pages/Products/Product-list/Products.js";
import Categories from "./Dashboard/Pages/Categories/Categories/Categories.js";
import ListRoles from "./Dashboard/Pages/Roles/ListRoles/ListRoles.js";
import CreateRole from "./Dashboard/Pages/Roles/CreateRole/CreateRole.js";
import Setting from "./Dashboard/Pages/Setting/Setting.js";
import Users from "./Dashboard/Pages/Users/UserListing/UserListing.js";
import UserCreate from "./Dashboard/Pages/Users/UserCreate/UserCreate.js";
import UserEdit from "./Dashboard/Pages/Users/UserEdit/UserEdit.js";
import UserDetail from "Dashboard/Pages/Users/UserDetails/UserDetails.js";
import Emps from "./Dashboard/Pages/Employees/EmpListing/EmpListing.js";
import EmpCreate from "Dashboard/Pages/Employees/EmpCreate/EmpCreate.js";
import EmpEdit from "Dashboard/Pages/Employees/EmpEdit/EmpEdit.js";
import EmpDetails from "Dashboard/Pages/Employees/EmpDetail/EmpDetail.js";
import OrderDetail from "Dashboard/Pages/Orders/OrderDetails/OrderDetails.js";
import EditRole from "Dashboard/Pages/Roles/EditRole/EditRole.js";
// import AboutUS from "Dashboard/Pages/AboutUs/ShowAboutUs/ShowAboutUs.js";
// import ContactUs from "Dashboard/Pages/ContactUs/ShowContactUs/ShowContactUs.js";
import AddProduct from "Dashboard/Pages/Products/Product-add/AddProduct.js";
import AddCategory from "Dashboard/Pages/Categories/AddCategory/AddCategory.js";
import ForgetPssword from "Dashboard/Components/Forgot/ForgetPassword.js";
import ConfirmNewPassword from "Dashboard/Components/ConfirmNewPassword/ConfirmNewPassword.js";
import UpdateCategory from "Dashboard/Pages/Categories/updateCategory/UpdateCategory.js";
import UpdateProduct from "Dashboard/Pages/Products/Product-edit/Product-edit.js";

var routes = [
  {
    path: "/user-profile",
    name: "New",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Categories />,
    layout: "/admin",
  },
  {
    path: "/addCategory",
    name: "New",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <AddCategory />,
    layout: "/admin",
  },
  {
    path: "/editcategory/:id",
    name: "New",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <UpdateCategory />,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-bag-17 text-blue",
    component: <Products />,
    layout: "/admin",
  },
  {
    path: "/addProducts",
    name: "New",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <AddProduct />,
    layout: "/admin",
  },
  {
    path: "/edit-product/:id",
    name: "New",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <UpdateProduct />,
    layout: "/admin",
  },

  {
    path: "/orders",
    name: "Orders",
    icon: "fa fa-shopping-basket text-blue",
    component: <Orders />,
    layout: "/admin",
  },

  {
    path: "/users",
    name: "Customers",
    icon: "fa fa-users text-blue",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/users/create",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <UserCreate />,
    layout: "/admin",
  },
  {
    path: "/UserEdit/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <UserEdit />,
    layout: "/admin",
  },
  {
    path: "/UserDetail/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <UserDetail />,
    layout: "/admin",
  },
  {
    path: "/employees",
    name: "Employees",
    icon: "fa fa-person-military-pointing text-blue",
    component: <Emps />,
    layout: "/admin",
  },

  {
    path: "/employees/create",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <EmpCreate />,
    layout: "/admin",
  },
  {
    path: "/EmpEdit/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <EmpEdit />,
    layout: "/admin",
  },
  {
    path: "/EmpDetails/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <EmpDetails />,
    layout: "/admin",
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "fa fa-unlock text-blue",
    component: <ListRoles />,
    layout: "/admin",
  },
  {
    path: "/roles/create",
    name: "New",
    icon: "fa fa-lock text-blue",
    component: <CreateRole />,
    layout: "/admin",
  },
  {
    path: "/roles/edit/:id",
    name: "New",
    icon: "fa fa-lock text-blue",
    component: <EditRole />,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Settings",
    icon: "fa fa-gear text-blue",
    component: <Setting />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "New",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  {
    path: "/OrderDetails/:id",
    name: "New",
    component: <OrderDetail />,
    layout: "/admin",
  },
  {
    path: "/reset-password-token",
    name: "New",
    icon: "ni ni-key-25 text-info",
    component: <ForgetPssword />,
    layout: "/auth",
  },
  {
    path: "/reset-password",
    name: "New",
    icon: "ni ni-key-25 text-info",
    component: <ConfirmNewPassword />,
    layout: "/auth",
  },
];
export default routes;
