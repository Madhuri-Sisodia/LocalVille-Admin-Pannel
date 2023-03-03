import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import AdminManager from "views/AdminManager";
// import SubCategory from "views/categorySection/SubCategory.js";
import Category from "views/categorySection/index.js";
import StoreManager from "views/StoreManager/StoreManager";
import VendorsManager from "views/VendorsManager/VendorsManager";
import Products from "views/Products/Products";
import ProductApproval from "views/ProductApproval/ProductApproval";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/admin",
    name: "Admin Manager",
    icon: "nc-icon nc-circle-09",
    component: AdminManager,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Categories",
    icon: "nc-icon nc-circle-09",
    component: Category,
    layout: "/admin"
  },
  
  // {
  //   path: "/subcategory",
  //   name: "Sub-Categories",
  //   icon: "nc-icon nc-circle-09",
  //   component: SubCategory,
  //   layout: "/admin"
  // },
  
  {
    path: "/vendors",
    name: "Vendors Manager",
    icon: "nc-icon nc-circle-09",
    component: VendorsManager,
    layout: "/admin"
  },

  {
    path: "/store",
    name: "Store Manager",
    icon: "nc-icon nc-circle-09",
    component: StoreManager,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-circle-09",
    component: Products,
    layout: "/admin"
  },

  {
    path: "/user",
    name: "User Profile",
    path: "/productapproval",
    name: "Product Approval",
    icon: "nc-icon nc-circle-09",
    component: ProductApproval,
    layout: "/admin"
  },

  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  
];

export default dashboardRoutes;

