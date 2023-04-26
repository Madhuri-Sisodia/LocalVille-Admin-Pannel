import Dashboard from "views/Dashboard/Dashboard";
import { FaStore } from "react-icons/fa";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
// import { faStore} from "@fortawesome/fontawesome-free";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notifications from "views/Notifications.js";
import AdminManager from "views/AdminManager";
import Category from "views/categorySection/index.js";
import StoreManager from "views/StoreManager/StoreManager";
import VendorsManager from "views/VendorsManager/VendorsManager";
import ProductManager from "views/ProductManager/ProductManager";
import ProductApproval from "views/ProductApproval/ProductApproval";
import StoreApproval from "views/StoreApproval/StoreApproval";
import NotificationManager from "views/NotificationManager";
import EmailManager from "views/EmailManager/EmailManager";

import BannerManager from "views/BannerManager/BannerManager";
import InvoiceTable from "views/InvoiceManager/InvoiceTable";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/admin",
    name: "Admin Manager",
    icon: "nc-icon nc-single-02",
    component: AdminManager,
    layout: "/admin",
  },

  {
    path: "/banner",
    name: "Banner Manager",
    icon: "nc-icon nc-album-2",
    component: BannerManager,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Categories",
    icon: "nc-icon nc-grid-45",
    component: Category,
    layout: "/admin",
  },

  {
    path: "/vendors",
    name: "Vendors Manager",
    icon: "nc-icon nc-circle-09",
    component: VendorsManager,
    layout: "/admin",
  },

  {
    path: "/store",
    name: "Store Manager",
    icon: "fa-light fa-cart-plus",
    component: StoreManager,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product Manager",
    icon: "fas fa-box",
    component: ProductManager,
    layout: "/admin",
  },

  {
    path: "/productapproval",
    name: "Product Approval",
    icon: "fas fa-shopping-cart",
    component: ProductApproval,
    layout: "/admin",
  },
  {
    path: "/storeApproval",
    name: "Store Approval",
    icon: "fa fa-shopping-basket",
    component: StoreApproval,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    path: "/notification",
    name: "Notification Manager",
    icon: "nc-icon nc-notification-70",
    component: NotificationManager,
    layout: "/admin",
  },
  {
    path: "/Emailer",
    name: "Email Manager",
    icon: "far fa-envelope-open",
    component: EmailManager,
    layout: "/admin",
  },
  {
    path: "/Invoice",
    name: "Invoice Manager",
    icon: "fas fa-file-invoice",
    component: InvoiceTable,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin"
  // },

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

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },

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
