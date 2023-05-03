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
import dashboard from "./assets/img/dashboard.svg";
import Admin from "./assets/img/user.svg"
import Banner from "./assets/img/image.svg";
import Categories from "./assets/img/Category.svg"
import Vendor from "./assets/img/admin.svg"
import store from "./assets/img/storemanager.svg";
import Product from "./assets/img/products.svg"
import productApproval from "./assets/img/store.svg";
import storeApproval from "./assets/img/stores.svg";
import notification from "./assets/img/notification.svg";
import Email from "./assets/img/email.svg";
import invoice from "./assets/img/invoice.svg";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    svgImg: dashboard,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/admin",
    name: "Admin Manager",
    svgImg: Admin,
    component: AdminManager,
    layout: "/admin",
  },

  {
    path: "/banner",
    name: "Banner Manager",
    svgImg:Banner,
    component: BannerManager,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Categories",
    svgImg: Categories,
    component: Category,
    layout: "/admin",
  },

  {
    path: "/vendors",
    name: "Vendors Manager",
    svgImg: Vendor,
    component: VendorsManager,
    layout: "/admin",
  },

  {
    path: "/store",
    name: "Store Manager",
    svgImg: store,
    component: StoreManager,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product Manager",
    svgImg: Product,
    component: ProductManager,
    layout: "/admin",
  },

  {
    path: "/productapproval",
    name: "Product Approval",
    svgImg: productApproval,
    component: ProductApproval,
    layout: "/admin",
  },
  {
    path: "/storeApproval",
    name: "Store Approval",
    svgImg: storeApproval,
    component: StoreApproval,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    path: "/notification",
    name: "Notification Manager",
    svgImg: notification,
    component: NotificationManager,
    layout: "/admin",
  },
  {
    path: "/Emailer",
    name: "Email Manager",
    svgImg: Email,
    component: EmailManager,
    layout: "/admin",
  },
  {
    path: "/Invoice",
    name: "Invoice Manager",
    svgImg: invoice,
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
