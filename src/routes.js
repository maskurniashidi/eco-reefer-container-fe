import { lazy } from "react";
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

const User = lazy(() => import("./pages/User/User/User"));
const AddUser = lazy(() => import("./pages/User/AddUser/AddUser"));
const DetailUser = lazy(() => import("./pages/User/DetailUser/DetailUser"));

const Admin = lazy(() => import("./pages/Admin/Admin/Admin"));
const AddAdmin = lazy(() => import("./pages/Admin/AddAdmin/AddAdmin"));
const DetailAdmin = lazy(() => import("./pages/Admin/DetailAdmin/DetailAdmin"));

const Profile = lazy(() => import("./pages/Profile/Profile/Profile"));

export const APP_ROUTE = [
  {
    name: "Login",
    path: "/",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    private: true,
  },
  {
    name: "User",
    path: "/user",
    exact: true,
    component: User,
    private: true,
  },
  {
    name: "AddUser",
    path: "/user/tambah-user",
    exact: true,
    component: AddUser,
    private: true,
  },
  {
    name: "DetailUser",
    path: "/user/detail-user/:id",
    exact: true,
    component: DetailUser,
    private: true,
  },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    component: Profile,
    private: true,
  },
  {
    name: "Admin",
    path: "/admin",
    exact: true,
    component: Admin,
    private: true,
  },
  {
    name: "AddAdmin",
    path: "/admin/tambah-admin",
    exact: true,
    component: AddAdmin,
    private: true,
  },
  {
    name: "DetailAdmin",
    path: "/admin/detail-admin/:id",
    exact: true,
    component: DetailAdmin,
    private: true,
  },
];
